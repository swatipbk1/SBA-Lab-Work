const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions) {
  // Validate if AssignmentGroup belongs to its course
  if (ag.course_id !== course.id) {
    throw new Error("Invalid input: AssignmentGroup does not belong to its course.");
  }

  const result = [];

  const learnerMap = new Map();

  submissions.forEach((submission) => {
    const learnerId = submission.learner_id;
    const assignmentId = submission.assignment_id;

    if (!learnerMap.has(learnerId)) {
      learnerMap.set(learnerId, { id: learnerId, assignments: {}, totalScore: 0, totalPoints: 0 });
    }

    const learnerData = learnerMap.get(learnerId);

    const assignment = ag.assignments.find((assign) => assign.id === assignmentId);

    try {
      if (!assignment) {
        // Skip this iteration if assignment is not found
        return;
      }

      if (new Date(assignment.due_at) > new Date()) {
        // Skip this iteration if assignment is not yet due
        return;
      }

      const assignmentName = assignment.name;
      const pointsPossible = assignment.points_possible;

      // Use switch for handling different cases related to points_possible
      switch (true) {
        case pointsPossible === 0:
          throw new Error("Invalid data: points_possible cannot be 0.");
        default:
          const score = submission.submission.score;

          // Validate if score is a number
          switch (true) {
            case isNaN(score):
              throw new Error("Invalid data: Score should be a number.");
            default:
              // Deduct 10% for late submissions
              const submissionDate = new Date(submission.submission.submitted_at);
              if (submissionDate > new Date(assignment.due_at)) {
                const latePenalty = pointsPossible * 0.1;
                learnerData.totalScore += Math.max(0, score - latePenalty);
              } else {
                learnerData.totalScore += score;
              }

              learnerData.totalPoints += pointsPossible;
              learnerData.assignments[assignmentId] = Math.round((score / pointsPossible) * 100) / 100;
          }
      }
    } catch (error) {
      console.error(error.message);
    }
  });

  learnerMap.forEach((learnerData) => {
    const assignments = { id: learnerData.id, avg: 0 };

    for (const assignmentId in learnerData.assignments) {
      if (Object.hasOwnProperty.call(learnerData.assignments, assignmentId)) {
        assignments[assignmentId] = learnerData.assignments[assignmentId];
      }
    }

    if (learnerData.totalPoints > 0) {
      assignments.avg = Math.round((learnerData.totalScore / learnerData.totalPoints) * 100) / 100;
    }

    result.push(assignments);
  });

  return result;
}

// Example usage:
try {
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);
} catch (error) {
  console.error(error.message);
}