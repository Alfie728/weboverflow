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
          className="card-wrapper rounded-[10px] border p-9 shadow-lg transition-transform hover:scale-105 hover:bg-light-800 hover:shadow-xl dark:shadow-light-100 dark:hover:bg-dark-400 dark:hover:shadow-light-200 sm:px-11"
        >
          <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
            <div>
              <span className="text-dark400_light700 line-clamp-1 flex items-baseline">
                {job.employer_name}
              </span>
              <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                {job.job_title}
              </h3>
            </div>
            <Link href={job.job_apply_link} className="flex justify-end">
              <div className="background-light700_dark400 flex size-[56px] items-center justify-center rounded-full">
                <Image
                  src={job.employer_logo || "/assets/icons/account.svg"}
                  alt={job.employer_name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="mt-1 flex flex-wrap gap-3">
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
            <div className="flex items-center gap-1">
              <FiDollarSign className="text-light400_light500" />
              <p className="body-medium text-light400_light500">
                {formatSalary(job.job_min_salary, job.job_max_salary)}
              </p>
            </div>
          </div>

          <Link
            href={job.job_apply_link}
            className="flex-center body-medium mt-6 w-fit text-primary-500"
          >
            Apply Now
          </Link>
        </div>
      ))}
    </div>
  );
}
