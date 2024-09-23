const Pokemon = class {
    constructor(name, hp, attack, defense, ability) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.ability = ability;
    }
    useAttack = (target) => {
        target.defense >= this.attack ? console.log(target.name, " ne subit aucun dégât") : target.hp -= (this.attack - target.defense)
    }
    
    useAbility = (target) => {
        target.hp -= (this.attack * this.ability.damageMultiplier - target.defense)
    }
    
    displayStats = () => {
        console.log(
            `
            Nom: ${this.name},
            PDV: ${this.hp},
            Attaque: ${this.attack},
            Défense: ${this.defense}`,
        )
    }
    
    isKO = () => {
        return this.hp <= 0
    }
    
}

const Trainer = class {
    constructor(name, pokemons = [], inventory = []) {
        this.name = name;
        this.pokemons = pokemons;
        this.inventory = inventory;
    }

    addPokemon = (pokemon) => {
    this.pokemons.push(pokemon)
    }

     chosePokemon = (pokemonIndex) => {
    //     if (this.pokemons[pokemonIndex].isKO) {
    //         console.log("Ce pokémon est KO")
    //     } else {
    //         return this.pokemons[pokemonIndex]
    //     }
        return this.pokemons[pokemonIndex].isKO() ? console.log("Ce pokemon est KO") : this.pokemons[pokemonIndex]
    }

    addItem = (item) => {
        this.inventory.push(item)
    }

    useItem = (item, itemIndex, target) => {
        this.inventory.splice(itemIndex, 1)
        item.useItem(target)
        //TODO effect
    }

    allKO = () => {
        return this.pokemons.filter(pokemon => !pokemon.isKO()).length === 0
    }
}

const Item = class {
    constructor(name, effect) {
        this.name = name;
        this.effect = effect;
    }
    useItem = (target) => this.effect(target)
}

const Ability  = class {
    constructor(name, damageMultiplier) {
        this.name = name;
        this.damageMultiplier = damageMultiplier;
    }
}
const Bolt = new Ability("Bolt", 3)
const Surf = new Ability("Surf", 2)


const Pikachu = new Pokemon("Pikachu", 100, 30, 20, Bolt)
const Mudkip = new Pokemon("Mudkip", 120, 25, 25, Surf)
const Mudkip2 = new Pokemon("Mudkip", 120, 25, 25, Surf)

const potion = new Item("potion", (target) => {target.hp += 10})
const potion2 = new Item("potion", (target) => {target.hp += 10})
const potion3 = new Item("potion", (target) => {target.hp += 10})

const attackBoost = new Item("attack +", (target) => {target.attack += 10})
const defenseBoost = new Item("defense +", (target) => {target.defense += 10})

const player = new Trainer('Red', [Pikachu, Mudkip], [potion, potion2, attackBoost])
const enemyTrainer = new Trainer('Blue', [Mudkip2], [potion3, defenseBoost])

Pikachu.useAttack(Mudkip2)
Mudkip2.displayStats()

Mudkip2.useAbility(Pikachu)
Pikachu.displayStats()
