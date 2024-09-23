const Pokemon = class {
    constructor(name, hp, attack, defense, ability) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.ability = ability;
    }
    attack = (target) => {
        target.hp -= (this.attack - target.defense)
        //TODO gerer heal
    }
    
    useAbility = (target) => {
        target.hp -= (this.attack * this.ability.damageMultiplier - target.defense)
    }
    
    displayStats = () => {
        console.log()
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
        return this.pokemons[pokemonIndex].isKO() ? false : this.pokemons[pokemonIndex]
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
        this.effect = effect()
    }
    useItem = (pokemon) => this.effect(pokemon)
}

const Ability  = class {
    constructor(name, damageMultiplier) {
        this.name = name;
        this.damageMultiplier = damageMultiplier;
    }
}

const heal = (target, amount) => {
    target.hp += amount
}

const boost = (target, stat, amount) => {
    target.stat += amount
}

const Bolt = new Ability("Bolt", 3)
const Surf = new Ability("Surf", 2)


const Pikachu = new Pokemon("Pikachu", 100, 30, 20, Bolt)
const Mudkip = new Pokemon("Mudkip", 120, 25, 25, Surf)

const potion = new Item("potion", heal)
const attackBoost = new Item("attack +", boost)
const defenseBoost = new Item("defense +", boost)

const player = new Trainer('Red', [Pikachu, Mudkip], [potion, potion, attackBoost])
const enemyTrainer = new Trainer('Blue', [Mudkip], [potion, defenseBoost])