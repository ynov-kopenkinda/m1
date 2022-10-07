import random

temps_list = [random.randint(18, 25) for _ in range(30)]

# temps_list = []
# while len(temps_list) < 31:
#     user_input = input(
#         "Température pour le jour {}: ".format(len(temps_list)+1))
#     if user_input == "q":
#         break
#     temps_list.append(int(user_input))


def avg(l):
    return sum(l)/len(l)


def show():
    for temp in sorted(temps_list):
        print("{}°C".format(temp))


average = avg(temps_list)
maximum = max(temps_list)
minimum = min(temps_list)
print("Moyenne: ", round(average, 2))
print("Maximum: ", maximum)
print("Minimum: ", minimum)
show()
