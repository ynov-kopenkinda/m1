from typing import List
from models import Character, Level
from random import shuffle

players: List[Character] = []


def choose_character(without: Character | None) -> Character:
    for i, character in enumerate(players):
        status = 'X' if character.hp <= 0 else '-' if character == without else ' '
        print(f"[{status}] {i + 1}. {character.name}")
    user_input = int(input("Choose a character: "))
    if user_input > len(players) or user_input < 1:
        print("Invalid choice.")
        return choose_character(without)
    if players[user_input - 1] == without:
        print("You can't attack yourself.")
        return choose_character(without)
    return players[user_input - 1]


def character_action(chosen: Character):
    while True:
        print("1. Attack")
        print("2. Speak")
        print("q. Exit")
        user_input = input("Votre choix?: ")
        if user_input == "q":
            return
        if user_input == "1":
            attacked = choose_character(chosen)
            dmg = int(input("Damage?: "))
            chosen.attack(attacked, dmg)
            return
        if user_input == "2":
            message = input("What do you want the character to say?: ")
            chosen.speak(message)
            return


def init():
    player_amount = input("How many players?: ")
    if player_amount == "skip":
        players.append(Character("Player 1", 2, 25, "sword"))
        players.append(Character("Player 2", 2, 25, "axe"))
        players.append(Character("Player 3", 2, 25, "wand"))
        return
    player_amount = int(player_amount)
    if (player_amount < 2):
        print("Not enough players.")
        init()
    for i in range(player_amount):
        print("Player {}".format(i + 1))
        name = input("Name?: ")
        force = int(input("Force?: "))
        weapon = input("Weapon?: ")
        character = Character(name, 2, force, weapon, Level.STARTER)
        players.append(character)
        print(character)
    shuffle(players)


def game(turn: int) -> bool:
    print("a. Action")
    print("s. Stop playing")
    user_input = input("Votre choix?: ")
    if user_input == "s":
        return False
    if user_input == "a":
        chosen = players[turn % len(players)]
        print("It's {}'s turn.".format(chosen.name))
        if chosen.__isDead__():
            return True
        character_action(chosen)
    return True


def show_characters():
    for character in players:
        print(character)


def check_win():
    alive = []
    for character in players:
        if not character.hp <= 0:
            alive.append(character)
    if len(alive) == 1:
        print("{} won!".format(alive[0].name))
        return True
    return False


def main():
    turn = 0
    init()
    while game(turn):
        turn += 1
        show_characters()
        if check_win():
            break


if __name__ == "__main__":
    main()
