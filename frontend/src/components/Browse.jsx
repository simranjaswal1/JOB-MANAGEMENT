import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs"; // Custom hook to fetch jobs

const Browse = () => {
  // Fetch all jobs when the component mounts
  useGetAllJobs();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Reset search query on component unmount
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery({ query: "", location: "" }));
    };
  }, [dispatch]);

  const { query, location } = searchedQuery;

  // Filter jobs based on query (job title) and location
  const filteredJobs = allJobs.filter((job) => {
    const jobMatchesQuery = query
      ? job.title?.toLowerCase().includes(query.toLowerCase())
      : true; // Ignore if query is empty
    const jobMatchesLocation = location
      ? job.location?.toLowerCase().includes(location.toLowerCase())
      : true; // Ignore if location is empty

    return jobMatchesQuery && jobMatchesLocation;
  });

  // Debug Logs
  console.log("Searched Query:", searchedQuery);
  console.log("All Jobs:", allJobs);
  console.log("Filtered Jobs:", filteredJobs);

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-10">
        {/* Heading */}
        <h1 className="font-bold text-xl my-10">
          Search Results ({filteredJobs.length})
        </h1>

        {/* Job Listings */}
        <div className="grid grid-cols-3 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              return <Job key={job._id} job={job} />;
            })
          ) : (
            // Fallback message when no jobs match the search criteria
            <p>No jobs found matching your search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
