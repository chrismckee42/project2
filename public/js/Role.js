class Role {
    constructor (hp, atk, dodge){
        Object.assign(this, {hp, atk, dodge});
    }
}

module.exports = Role;