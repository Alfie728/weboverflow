import Image from "next/image";
import Link from "next/link";
import { FiBriefcase, FiDollarSign, FiMapPin } from "react-icons/fi";
import { JobListProps } from "@/lib/actions/shared.types";

export default function JobList({ jobs }: JobListProps) {
  if (!jobs || jobs.length === 0) {
    return <p className="text-center text-gray-500">No jobs found.</p>;
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (min === null && max === null) return "Not disclosed";
    if (min === null) return `Up to $${max}`;
    if (max === null) return `From $${min}`;
    return `${min} - ${max}`;
  };

  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {jobs.map((job) => (
        <div
          key={job.job_id}
          className="card-wrapper rounded-[10px] border p-6 shadow-lg transition-transform hover:scale-105 hover:bg-light-800 hover:shadow-xl dark:shadow-light-100 dark:hover:bg-dark-400 dark:hover:shadow-light-200 sm:p-8"
        >
          <div className="flex items-center gap-4">
            <Link href={job.job_apply_link} className="shrink-0">
              <div className="background-light700_dark400 flex size-[80px] items-center justify-center rounded-full">
                <Image
                  src={job.employer_logo || "/assets/icons/account.svg"}
                  alt={job.employer_name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="grow">
              <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1">
                {job.job_title}
              </h3>
              <span className="text-dark400_light700 mt-2 line-clamp-1 text-sm ">
                {job.employer_name}
              </span>
            </div>
          </div>
          <p className="text-dark400_light700 mt-4 line-clamp-2 text-sm">
            {job.job_description}
          </p>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-light400_light500" />
              <p className="body-medium text-light400_light500">
                {job.job_city}, {job.job_country.toUpperCase()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FiBriefcase className="text-light400_light500" />
              <p className="body-medium text-light400_light500">
                {job.job_employment_type}
              </p>
            </div>
            <div className="flex items-center gap-0.5">
              <FiDollarSign className="text-light400_light500" />
              <p className="body-medium text-light400_light500">
                {formatSalary(job.job_min_salary, job.job_max_salary)}
              </p>
            </div>
          </div>

          <Link
            href={job.job_apply_link}
            className="flex-center body-medium  mt-4 w-fit rounded-md bg-primary-500 px-4 py-2 text-white"
          >
            Apply Now
          </Link>
        </div>
      ))}
    </div>
  );
}
