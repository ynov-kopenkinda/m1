a = int(input('a = '))
b = int(input('b = '))
c = int(input('c = '))
print("Les trois variables sont a = {}, b = {}, c = {}".format(a, b, c))
somme = a + b + c
print("La somme des trois variables est {}".format(somme))
a, b = b, a
print("a vaut maintenant = {}, b = {}".format(a, b))

# Version 1
minimum = None
maximum = None
if a > b and a > c:
    maximum = a
elif b > a and b > c:
    maximum = b
else:
    maximum = c
if a < b and a < c:
    minimum = a
elif b < a and b < c:
    minimum = b
else:
    minimum = c
print("Le minimum est {}, le maximum est {}".format(minimum, maximum))

# Version 2
minimum = a
maximum = a
for i in [a, b, c]:
    if i < minimum:
        minimum = i
    if i > maximum:
        maximum = i
print("Le minimum est {}, le maximum est {}".format(minimum, maximum))
