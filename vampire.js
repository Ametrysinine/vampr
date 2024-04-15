class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {

    let currentVampire = this;
    let vampireDistance = 0;
    while (currentVampire.creator) {
      vampireDistance += 1;
      currentVampire = currentVampire.creator;
    }

    return vampireDistance;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let distanceA = this.numberOfVampiresFromOriginal;
    let distanceB = vampire.numberOfVampiresFromOriginal;

    return (distanceA < distanceB);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let vampireA = this.isMoreSeniorThan(vampire) ? this : vampire;
    let vampireB = this.isMoreSeniorThan(vampire) ? vampire : this;


    const genealogyA = [vampireA];
    const genealogyB = [vampireB];

    while (vampireA.creator !== null) {
      genealogyA.push(vampireA.creator);
      vampireA = vampireA.creator;
    }

    while (vampireB.creator !== null) {
      genealogyB.push(vampireB.creator);
      vampireB = vampireB.creator;
    }

    for (let a of genealogyA) {
      for (let b of genealogyB) {
        if (a === b) {
          return a;
        }
      }
    }
  }
}

module.exports = Vampire;

