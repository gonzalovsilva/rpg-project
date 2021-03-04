function Person(chName, race, item) {
    this.chName = chName;
    this.race = race;
    this.item = item;
    this.currenthealth = 100;
    this.maxHealth = 100;

    this.maxDamage = 20;
    this.maxHealing = 30;

    switch (this.race) {
        case 'orc':
            // 40% more max health
            this.maxHealth += 0.4 * this.maxHealth;
            this.currenthealth = this.maxHealth;
            break;
    };

    this.heal = function () {
        let tempHeal = (Math.floor(Math.random() * this.maxHealing) + 1);
        if (this.item == 'staff') {
            tempHeal = Math.floor(tempHeal * 1.20);
        }
        this.currenthealth = Math.floor(this.currenthealth + tempHeal);
        this.currenthealth > this.maxHealth ? this.currenthealth = this.maxHealth : this.currenthealth;
        // console.log(`%c ${this.chName} ` + `%c a récupéré ${tempHeal} | curHealth = ${this.currenthealth}/${this.maxHealth}`, `background: #222; color: #bada55`, ``);
        if(this.currenthealth == this.maxHealth){
            return `my life is at max`;
        }else{
            return `got healed ${tempHeal} of life`;
        }
    };

    this.lifeSteal = function (player) { //Steal 4% of current health each round ( 10% is too much!)
        let log = ["", ""];
        let steal = Math.floor(0.04 * this.currenthealth);
        this.currenthealth = Math.floor(this.currenthealth - steal);
        player.currenthealth = Math.floor(player.currenthealth + steal);

        this.currenthealth < 0 ? this.currenthealth = 0 : this.currenthealth;
        player.currenthealth > player.maxHealth ? player.currenthealth = player.maxHealth : player.currenthealth;
        // console.log('%c vampire lifesteal', `background: #ed651d; color: #fdece3`);
        // console.log(`%c ${player.chName} ` + `%c stole ${steal}`, `background: #222; color: #bada55`, ``);
        // console.log(`%c ${this.chName} ` + `%c curHealth = ${this.currenthealth}/${this.maxHealth}`, `background: #222; color: #bada55`, ``);
        // console.log(`%c ${player.chName} ` + `%c curHealth = ${player.currenthealth}/${player.maxHealth}`, `background: #222; color: #bada55`, ``);

        log[1] = `stole ${steal} 'cause ${player.chName} is a vampire`;
        return log;
    };

    this.damage = function (player) { //adds damage to [this](player attaqué), function parameter(player = attaquant)
        let log = ["", "", 0];
        let adversity = Math.random();

        if (this.item == 'boots' && adversity <= 0.3) {
            // console.log(`%c ${this.chName} ` + `%c a esquivé l'ataque grâce aux bottes!`, `background: #222; color: #bada55`, ``); //this log
            log[0] = `dodged the attack thanks to my boots`;
            return log;
        } else {
            let elfAdversity = Math.random();
            let tempDamage = (Math.floor(Math.random() * this.maxDamage) + 1);

            if (this.race == 'elf' && elfAdversity <= 0.3) {
                // 30% chance to deflect the attack back to the opponent.The attacker takes damage equal to 50% of the original hit. The elf takes no damage.
                player.currenthealth = Math.floor(player.currenthealth - (0.5 * tempDamage));
                player.currenthealth < 0 ? player.currenthealth = 0 : player.currenthealth;
                // console.log(`%c ${player.chName} ` + `%c a prit ${0.5 * tempDamage} de dammage 'cause ${this.chName} is an elf`, `background: #222; color: #bada55`, ``);
                // console.log(`%c ${player.chName} ` + `%c curHealth = ${player.currenthealth}/${player.maxHealth}`, `background: #222; color: #bada55`, ``); //player log
                log[0] = `deflected the attack back to the ${this.chName}`;
                log[1] = `took ${0.5 * tempDamage} of damage 'cause ${this.chName} is an elf`;
                log[2] = 2;
                return log;
            } else {
                let humanText = '';
                if (this.race == 'human') {
                    // 20% less damage taken
                    // console.log(`20% less damage taken because ${this.chName} is human`); //this log
                    tempDamage -= tempDamage * 0.20;
                    humanText = `(20% less 'cause I'm an human)`;
                }
                if (player.item == 'sword') {
                    tempDamage *= 1.30;
                    // console.log(`30% more damage taken because ${player.chName} has a sword`); //player log
                    log[1] = `charged more 30% thanks to my sword`;
                }
                let bowAdversity = Math.random();
                if (player.item == 'bow' && bowAdversity <= 0.3) {
                    tempDamage *= 2;
                    // console.log(`${player.chName} made a double attack 'cause his bow`); //player log
                    log[1] = `double attack thanks to my bow`;
                }

                let dam = Math.floor(tempDamage);

                this.currenthealth = this.currenthealth - dam;
                this.currenthealth < 0 ? this.currenthealth = 0 : this.currenthealth;
                // console.log(`%c ${this.chName} ` + `%c total damage of ${dam} | curHealth = ${this.currenthealth}/${this.maxHealth}`, `background: #222; color: #bada55`, ``); //this log

                log[0] = `took ${dam} of damage ${humanText}`;
                log[2] = 1;
                return log;
            }
        }
    };

    // this.displayChar = function () {
    //     return console.log(`My name is ${this.chName}, I'm a ${this.race}, I wield a ${this.item}, my total health point are ${this.maxHealth}`);
    // };
};