// TODO: Hoisting versus "this" in conventional function vs. lambda function definitions
// DNA to RNA Conversion
// * for (const [item] of [array]) is an easy way to get items out of a list. 

const dna_list = ["GCAT", "GCUU", "UGCT", "U", "UUUU"]

// other ways of iterating:

dna_list.forEach((dna, index) => {
  // Do nothing
})

dna_list.map((dna, index) => [index, dna])
        .forEach(([index, dna]) => {
            // Do nothing
        });

for (const dna of dna_list) {
  // First iteration
  function DNAtoRNA(dna) { 
    const strLength = dna.length
    result = ""
    for (i = 0; i < strLength; i++) {
      if (dna[i] == "T") {
        result += "U"
      } else {
        result += dna[i]
      }
    } 
    return result     
  };

  const RNA = DNAtoRNA(dna)
  console.log(RNA)

  // Second iteration - For some reason this doesn't work in codewars
  function DNAtoRNA_v2(dna) {
    return dna.replace("T", "U")
  };

  const RNA_v2 = DNAtoRNA_v2(dna);
  console.log(RNA_v2);

  // Third iteration using Regex 
  function DNAtoRNA_v3(dna) {
    const regex = /T/g //"literal" notation rather than using a constructor function: 
    // const regex = new RegExp("T", "g")
    // (with global flag), other common flags - i is case-insensitive search
    return dna.replace(regex, 'U')
  };

  const RNA_v3 = DNAtoRNA_v3(dna);
  console.log(RNA_v3); 
};