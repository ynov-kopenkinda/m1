import random as r
from datetime import date


def get_random_date() -> date:
    month = r.randint(0, 11)
    day = r.randint(0, 30)
    try:
        return date(2022, month, day)
    except ValueError:
        return get_random_date()


def get_today() -> date:
    return date.today()


random_date = get_random_date()
today = get_today()


def print_date(d: date, label: str) -> None:
    print(label, d.strftime("%d-%m-%Y %H:%M:%S"))


print_date(random_date, "Random date")
print_date(today, "Today")

diff = today - random_date
higest = "Today" if diff.days > 0 else "Random date"
print(f"{higest} is the highest")

print("Diff:", diff.days)
