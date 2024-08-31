import JobList from "@/components/JobList";
import { fetchCountries, fetchJobs } from "@/lib/actions/jobs.action";
import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import { JOBS_PAGE_SIZE } from "@/constants";
import LocalSearchBar from "@/components/shared/Search/LocalSearchBar";
import type { Job } from "@/lib/actions/shared.types.d.ts";

// Mock data for jobs
const mockJobs: Job[] = [
  {
    job_id: "1",
    job_title: "Frontend Developer",
    job_apply_link: "https://example.com/apply/1",
    employer_name: "TechCorp",
    job_country: "us",
    job_city: "San Francisco",
    job_employment_type: "Full-time",
    job_min_salary: 80000,
    job_max_salary: 120000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "2",
    job_title: "Backend Engineer",
    job_apply_link: "https://example.com/apply/2",
    employer_name: "DataSystems",
    job_country: "gb",
    job_city: "London",
    job_employment_type: "Full-time",
    job_min_salary: 70000,
    job_max_salary: 100000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "3",
    job_title: "UX Designer",
    job_apply_link: "https://example.com/apply/3",
    employer_name: "DesignHub",
    job_country: "ca",
    job_city: "Toronto",
    job_employment_type: "Contract",
    job_min_salary: 75000,
    job_max_salary: 110000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "4",
    job_title: "Data Scientist",
    job_apply_link: "https://example.com/apply/4",
    employer_name: "AnalyticsPro",
    job_country: "de",
    job_city: "Berlin",
    job_employment_type: "Full-time",
    job_min_salary: 85000,
    job_max_salary: 130000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "5",
    job_title: "DevOps Engineer",
    job_apply_link: "https://example.com/apply/5",
    employer_name: "CloudTech",
    job_country: "au",
    job_city: "Sydney",
    job_employment_type: "Full-time",
    job_min_salary: 90000,
    job_max_salary: 140000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "6",
    job_title: "Mobile App Developer",
    job_apply_link: "https://example.com/apply/6",
    employer_name: "AppWizards",
    job_country: "in",
    job_city: "Bangalore",
    job_employment_type: "Full-time",
    job_min_salary: 50000,
    job_max_salary: 80000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "7",
    job_title: "Product Manager",
    job_apply_link: "https://example.com/apply/7",
    employer_name: "InnovateCo",
    job_country: "fr",
    job_city: "Paris",
    job_employment_type: "Full-time",
    job_min_salary: 95000,
    job_max_salary: 150000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "8",
    job_title: "Cybersecurity Analyst",
    job_apply_link: "https://example.com/apply/8",
    employer_name: "SecureNet",
    job_country: "sg",
    job_city: "Singapore",
    job_employment_type: "Full-time",
    job_min_salary: 80000,
    job_max_salary: 120000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "9",
    job_title: "AI Research Scientist",
    job_apply_link: "https://example.com/apply/9",
    employer_name: "AIFuture",
    job_country: "jp",
    job_city: "Tokyo",
    job_employment_type: "Full-time",
    job_min_salary: 100000,
    job_max_salary: 160000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "10",
    job_title: "Technical Writer",
    job_apply_link: "https://example.com/apply/10",
    employer_name: "DocuTech",
    job_country: "nl",
    job_city: "Amsterdam",
    job_employment_type: "Part-time",
    job_min_salary: 45000,
    job_max_salary: 70000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "11",
    job_title: "QA Engineer",
    job_apply_link: "https://example.com/apply/11",
    employer_name: "BugBusters",
    job_country: "se",
    job_city: "Stockholm",
    job_employment_type: "Full-time",
    job_min_salary: 70000,
    job_max_salary: 100000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "12",
    job_title: "Blockchain Developer",
    job_apply_link: "https://example.com/apply/12",
    employer_name: "CryptoInnovate",
    job_country: "ch",
    job_city: "Zurich",
    job_employment_type: "Contract",
    job_min_salary: 110000,
    job_max_salary: 180000,
    employer_logo: "/assets/icons/account.svg",
  },
  {
    job_id: "13",
    job_title: "UI/UX Researcher",
    job_apply_link: "https://example.com/apply/13",
    employer_name: "UserFirst",
    job_country: "br",
    job_city: "São Paulo",
    job_employment_type: "Full-time",
    job_min_salary: 60000,
    job_max_salary: 90000,
    employer_logo: "/assets/icons/account.svg",
  },
];

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { q?: string; location?: string; page?: string };
}) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  // const { jobs, totalJobs, isNext } = await fetchJobs(
  //   searchParams.q || "",
  //   searchParams.location,
  //   page
  // );

  // console.log(jobs);
  const { countries } = await fetchCountries();
  console.log(countries);

  // Filter jobs based on search query and location
  const filteredJobs = mockJobs.filter((job) => {
    const matchesQuery = searchParams.q
      ? job.job_title.toLowerCase().includes(searchParams.q.toLowerCase()) ||
        job.employer_name.toLowerCase().includes(searchParams.q.toLowerCase())
      : true;

    const matchesLocation = 
      !searchParams.location || 
      searchParams.location.toLowerCase() === 'none' ||
      job.job_country.toLowerCase() === searchParams.location.toLowerCase();

    return matchesQuery && matchesLocation;
  });

  // Pagination logic
  const startIndex = (page - 1) * JOBS_PAGE_SIZE;
  const endIndex = startIndex + JOBS_PAGE_SIZE;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / JOBS_PAGE_SIZE);
  const isNext = endIndex < totalJobs;

  // Create a filters array for the Filter component and sort it alphabetically
  const locationFilters = countries
    .map((country) => ({
      name: country.name.common,
      value: country.cca2?.toLowerCase() || country.name.common.toLowerCase(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // const totalPages = Math.ceil(totalJobs / JOBS_PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8 px-6 py-10 sm:px-14">
      <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Jobs</h1>
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

      {totalPages > 1 && (
        <Pagination pageNumber={page} totalPages={totalPages} isNext={isNext} />
      )}
    </div>
  );
}
