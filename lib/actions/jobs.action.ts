"use server";

import { JOBS_PAGE_SIZE } from "@/constants";
import { Country } from "@/lib/actions/shared.types";

export async function fetchJobs(
  searchQuery: string,
  location?: string,
  page: number = 1,
  pageSize: number = JOBS_PAGE_SIZE
) {
  const rapidApiKey = process.env.RAPID_API_KEY;
  if (!rapidApiKey) {
    throw new Error("RAPID_API_KEY is not set in environment variables");
  }

  try {
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        searchQuery
      )}${
        location ? `&location=${encodeURIComponent(location)}` : ""
      }&page=${page}&num_pages=1`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const skipAmount = (page - 1) * pageSize;
    const data = await response.json();

    const jobs = data.data.map((job: any) => ({
      id: job.job_id,
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city,
      description: job.job_description,
      salary: job.job_salary_currency + job.job_salary,
      applicationLink: job.job_apply_link,
      createdAt: new Date(job.job_posted_at_datetime_utc).toISOString(),
    }));

    const totalJobs = data.total_jobs;
    const isNext = totalJobs > skipAmount + jobs.length;

    return { jobs, isNext, totalJobs };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}

export async function fetchCountries(): Promise<{
  countries: Country[];
  totalCountries: number;
}> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected data format");
    }

    return { countries: data, totalCountries: data.length };
  } catch (error) {
    console.error("Error fetching countries:", error);
    return { countries: [], totalCountries: 0 };
  }
}
