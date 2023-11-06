function calculateJaccardSimilarity(arr1: Iterable<unknown> | null | undefined, arr2: Iterable<unknown> | null | undefined) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  }
  
  function calculateOverallSimilarity(student1: { selection: { preferences: any; background: any; interests: any; capabilities: any; }; }, student2: { selection: { preferences: any; background: any; interests: any; capabilities: any; }; }) {
    const preferenceSimilarity = calculateJaccardSimilarity(
      student1.selection.preferences,
      student2.selection.preferences
    );
  
    const backgroundSimilarity = calculateJaccardSimilarity(
      student1.selection.background,
      student2.selection.background
    );
  
    const interestsSimilarity = calculateJaccardSimilarity(
      student1.selection.interests,
      student2.selection.interests
    );
  
    const capabilitiesSimilarity = calculateJaccardSimilarity(
      student1.selection.capabilities,
      student2.selection.capabilities
    );
  
    // Calculate the average similarity
    return (
      (preferenceSimilarity +
        backgroundSimilarity +
        interestsSimilarity +
        capabilitiesSimilarity) /
      4
    );
  }
  
  export default function createBySimilarity(students: any[], groupSize: number) {
    const similarityThreshold = 0.5;
    const groups = [];
    const studentsAssigned = new Set(); // Track students already assigned to a group
  
    // Sort students in descending order of overall similarity to the first student
    students.sort((studentA, studentB) => {
      const similarityA = calculateOverallSimilarity(studentA, students[0]);
      const similarityB = calculateOverallSimilarity(studentB, students[0]);
      return similarityB - similarityA;
    });
  
    // Function to calculate the average similarity of a group
    function calculateGroupAverageSimilarity(group: string | any[]) {
      let totalSimilarity = 0;
      for (const student of group) {
        totalSimilarity += calculateOverallSimilarity(student, students[0]);
      }
      return totalSimilarity / group.length;
    }
  
    // Iterate through students and assign them to groups based on similarity
    for (const student of students) {
      if (studentsAssigned.has(student)) {
        continue; // Skip students already assigned to a group
      }
  
      let bestGroup = null;
      let bestGroupSimilarity = -1;
  
      for (const group of groups) {
        if (group.length < groupSize) {
          const groupSimilarity = calculateGroupAverageSimilarity(group);
          if (groupSimilarity >= similarityThreshold) {
            if (bestGroup === null || groupSimilarity > bestGroupSimilarity) {
              bestGroup = group;
              bestGroupSimilarity = groupSimilarity;
            }
          }
        }
      }
  
      if (bestGroup) {
        bestGroup.push(student);
        studentsAssigned.add(student);
      } else {
        groups.push([student]);
        studentsAssigned.add(student);
      }
    }
  
    return groups;
  }