import random

temps_list = [random.randint(18, 25) for _ in range(30)]
temps_dict = {}


for temp in temps_list:
    t = "{}°C".format(temp)
    if temps_dict.get(t) is not None:
        temps_dict[t] += 1
    else:
        temps_dict[t] = 1

for temp, count in sorted(temps_dict.items()):
    print("{}: {}".format(temp, count))
