import JobList from "@/components/JobList";
import { fetchCountries, fetchJobs } from "@/lib/actions/jobs.action";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import { JOBS_PAGE_SIZE } from "@/constants";
import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";

import { mockJobs } from "@/mockJobs";
import { Job } from "@/lib/actions/shared.types";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { q?: string; location?: string; page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  let jobs: Job[] = [];
  let isApiError: boolean = false;
  try {
    const result = await fetchJobs(
      searchParams.q || "",
      searchParams.location,
      page
    );
    jobs = result.jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    isApiError = true;
    // Fallback to mock data
    jobs = mockJobs;
  }

  const { countries } = await fetchCountries();

  // Filter jobs based on search query and location
  const filteredJobs = jobs.filter((job) => {
    const matchesQuery = searchParams.q
      ? job.job_title.toLowerCase().includes(searchParams.q.toLowerCase()) ||
        job.employer_name.toLowerCase().includes(searchParams.q.toLowerCase())
      : true;

    const matchesLocation =
      !searchParams.location ||
      searchParams.location.toLowerCase() === "none" ||
      job.job_country.toLowerCase() === searchParams.location.toLowerCase();

    return matchesQuery && matchesLocation;
  });

  // Update pagination logic based on filtered jobs
  const totalFilteredJobs = filteredJobs.length;
  const totalFilteredPages = Math.ceil(totalFilteredJobs / JOBS_PAGE_SIZE);
  const currentPage = Math.min(Math.max(1, page), totalFilteredPages || 1);
  const startIndex = (currentPage - 1) * JOBS_PAGE_SIZE;
  const endIndex = startIndex + JOBS_PAGE_SIZE;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
  const isNextFiltered = currentPage < totalFilteredPages;
  // Create a filters array for the Filter component and sort it alphabetically
  const locationFilters = countries
    .map((country) => ({
      name: country.name.common,
      value: country.cca2?.toLowerCase() || country.name.common.toLowerCase(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
        {isApiError && (
          <p className="text-dark500_light700 small-regular">
            API limit reached, Using mock data.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <LocalSearchBar
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Job Title, Company, or Keywords"
          otherClasses="flex-1"
        />

        <Filter
          filters={locationFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="max-md:flex"
          filterKey="location"
          placeholder="Select a Location"
        />
      </div>

      {paginatedJobs.length > 0 ? (
        <JobList jobs={paginatedJobs} />
      ) : (
        <p className="text-dark500_light700 text-center">
          No jobs found. Try a different search query or location.
        </p>
      )}

      {totalFilteredPages > 1 && (
        <Pagination
          pageNumber={currentPage}
          totalPages={totalFilteredPages}
          isNext={isNextFiltered}
        />
      )}
    </div>
  );
}
