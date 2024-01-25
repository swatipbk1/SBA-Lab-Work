Learner Data Processing
This script processes learner data based on course information, assignment groups, and learner submissions. It calculates the weighted average and includes assignment scores, considering due dates and potential late submissions.

Table of Contents
Usage
Input
Output
Function Signature
Example
Usage
To use this script, you can call the getLearnerData function with the required parameters. Make sure to pass valid data to ensure accurate processing.

Input
The script expects the following inputs:

Course Information (CourseInfo):

An object containing course details.
Assignment Group (AssignmentGroup):

An object defining the assignment group, including assignments and their details.
Learner Submissions (LearnerSubmissions):

An array of objects representing learner submissions, including learner IDs, assignment IDs, submission details, and scores.
Output
The script returns an array of objects containing the following information:

id: Learner ID
avg: Weighted average score for the learner
<assignment_id>: Percentage score for each assignment

Function Signature
function getLearnerData(course, ag, submissions)

Example
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

Note: Ensure that we need to handle potential errors gracefully, and the example usage includes a try-catch block for error handling.
