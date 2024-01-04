// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};
//console.log(returnRandBase());

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
//console.log(mockUpStrand());

//ARRAY FOR STORING INSTANCES THAT MIGHT SURVIVE
let survivors = [];

//CREATES AN OBJECT FOR GENETIC SEQUENCES
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    //CREATE MUTATE FUNCTION - switches out one of the dna bases
    mutate() {
      let randBaseIndex = Math.floor(Math.random() * this.dna.length); //generate a random index
      let randBase = this.dna[randBaseIndex]; //gives the string affected
      do {
        //do...while loop switches out the old base for a new one at least once.
        this.dna[randBaseIndex] = returnRandBase();
      } while (randBase === this.dna[randBaseIndex]); //if the bases are the same, it goes through the loop until they are different
      //return this.dna;
    },
    compareDNA(otherDNA) {
      //To test, I created 2 instances of aequor. See below.
      let inCommon = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherDNA[i]) {
          inCommon++;
        }
      }
      let comPercent = (inCommon / this.dna.length) * 100;
      return `These specimens have ${comPercent.toFixed()}% DNA in common.`;
    },
    //Tests how likely it is that an aequor will survive - needs to be 60% or more to be pushed to the survivors array
    willLikelySurvive() {
      let cgBase = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          cgBase++;
        }
      }
      if (cgBase / this.dna.length >= 0.6) {
        survivors.push(this);
        return true;
      } else {
        return false;
      }
    },
  };
};
//This while loop keeps creating aequors until a certain number of them are pushed to the survivors array
/*
1) define the target number
2) while the number's position on the survivors array is empty, continue creating aequors
*/
const viableA = (num) => {
  let target = num;
  let counter = 1; //use human number for UX because the 1st specimen is one
  while (survivors[num - 1] === undefined) {
    pAequorFactory(counter, mockUpStrand()).willLikelySurvive();
    counter++;
  }
  return survivors;
};

//TEST viableA
viableA(30);

/*pAequorFactory(1, mockUpStrand()).willLikelySurvive();
pAequorFactory(2, mockUpStrand()).willLikelySurvive();
pAequorFactory(3, mockUpStrand()).willLikelySurvive();
pAequorFactory(4, mockUpStrand()).willLikelySurvive();
pAequorFactory(5, mockUpStrand()).willLikelySurvive();*/

console.log(survivors);

//TEST willLikelySurvive
/*let aequor1 = pAequorFactory(1, mockUpStrand());
console.log(aequor1.dna);
console.log(aequor1.willLikelySurvive());*/

//TEST compareDNA
// create 2 instances of an aequor
/*let aequor1 = pAequorFactory(1, mockUpStrand()); 
let aequor2 = pAequorFactory(2, mockUpStrand());
//Use compareDNA of the first instance and pass the dna of the second sequence.
console.log(Object.keys(aequor1))//helps me see the keys of an object. Object is capitalized.
console.log(aequor1.compareDNA(aequor2.dna)); // The dna is already in the factory, so I don't have to specify*/

//TEST mutate
// create a mutable variable. .mutate() changes the initial random array, and stores the mutated value.
/*let dnaSeq = pAequorFactory(1, mockUpStrand());
console.log(dnaSeq);
dnaSeq.mutate();
console.log(dnaSeq);*/

//TEST pAequorFactory
//console.log(pAequorFactory(1, mockUpStrand()));
