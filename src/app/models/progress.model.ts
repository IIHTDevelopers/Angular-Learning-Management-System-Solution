export interface Progress {
    courseId: number;
    studentId: number;
    assignmentScores: { [assignmentTitle: string]: number };
    completionStatus: 'Not Started' | 'In Progress' | 'Completed';
    finalGrade?: number;
}  