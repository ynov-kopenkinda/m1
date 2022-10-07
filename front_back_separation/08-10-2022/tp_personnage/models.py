from enum import Enum


class Level(Enum):
    STARTER = 1
    INTERMEDIARY = 2
    EXPERT = 3


class Character:
    hp: int = 2
    name: str = "Character"
    power: float = 25
    weapon: str = "sword"
    level: Level = Level.STARTER
    __participatedInBattles__: int = 0

    def __eq__(self, __o: object) -> bool:
        if not isinstance(__o, Character):
            return False
        return self.name == __o.name and self.hp == __o.hp and self.power == __o.power and self.weapon == __o.weapon and self.level == __o.level

    def __init__(self, name: str = "Character", hp: int = 2, power: float = 25, weapon: str = "sword", level: Level = Level.STARTER) -> None:
        self.name = name
        self.hp = hp
        self.power = power
        self.weapon = weapon

    def __repr__(self) -> str:
        return "Character(name={}, hp={}, power={}, weapon={}, level={})".format(self.name, self.hp, self.power, self.weapon, self.level)

    def __isDead__(self):
        if self.hp <= 0:
            print("{} is dead.".format(self.name))
            return True
        return False

    def __evolve__(self):
        if self.__participatedInBattles__ >= 3 and self.level == Level.STARTER:
            self.level = Level.INTERMEDIARY
            self.power = round(self.power * 1.1, 2)
            print("{} has evolved to level {}.".format(self.name, self.level))
        if self.__participatedInBattles__ >= 10 and self.level == Level.INTERMEDIARY:
            self.level = Level.EXPERT
            self.power = round(self.power * 1.25, 2)
            print("{} has evolved to level {}.".format(self.name, self.level))

    def speak(self, text: str) -> None:
        print("{} says: \"{}\".".format(self.name, text))

    def attack(self, attacked, dmg: int) -> None:
        if dmg is None or dmg <= 0:
            print("{} can't attack {}.".format(self.name, attacked.name))
            return
        if self.__isDead__():
            return
        if attacked.__isDead__():
            return
        if self.power <= 0:
            self.power = 25
            self.hp -= 1
            print("{} has no power left. {} loses 1 hp.".format(
                self.name, self.name))
            self.__isDead__()
        self.__evolve__()
        attacked.__evolve__()
        if attacked.level == Level.EXPERT:
            attacked.power -= dmg * 0.9
        else:
            attacked.power -= dmg
        self.__participatedInBattles__ += 1
        attacked.__participatedInBattles__ += 1
        if (attacked.power <= 0):
            attacked.hp -= 1
            attacked.power = 25
            if not attacked.__isDead__():
                print("{} attacks {} with {} and deals {} damage. {} has {} hp left.".format(
                    self.name, attacked.name, self.weapon, self.power, attacked.name, attacked.hp))
            else:
                return
            print("{} loses 1 hp.".format(attacked.name))
