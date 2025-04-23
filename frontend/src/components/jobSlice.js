import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allJobs: [], // List of all jobs
    searchedQuery: { query: "", location: "" }, // Search filters
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setAllJobs(state, action) {
            state.allJobs = action.payload; // Populate allJobs when fetched
        },
        setSearchedQuery(state, action) {
            state.searchedQuery = action.payload; // Update search filters
        },
    },
});

export const { setAllJobs, setSearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;
