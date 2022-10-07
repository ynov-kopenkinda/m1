small_names = []
long_names = []
names = ["Jean", "Dmitrii", "Remi", "Antoine", "John", "Maximilian"]

for name in names:
    if len(name) >= 6:
        long_names.append(name)
    else:
        small_names.append(name)

print("Petits noms: {}".format(small_names))
print("Noms longs: {}".format(long_names))
