from typing import List

lines: List[str] = []


def menu() -> str:
    print("1. Add a line")
    print("2. Save")
    print("3. Quit")
    choice = input("Enter your choice: ")
    if choice not in ['1', '2', '3']:
        print("Invalid choice")
        return menu()
    return choice


with open('/Users/dk/Documents/studies/m1/front_back_separation/14-10-2022/temps.txt') as f:
    lines = f.readlines()

while True:
    choice = menu()
    if choice == '1':
        line = input("Enter a line: ")
        lines.append(line)
    elif choice == '2':
        with open('/Users/dk/Documents/studies/m1/front_back_separation/14-10-2022/tempsSave.txt', 'w') as f:
            f.writelines(lines)
    elif choice == '3':
        break
