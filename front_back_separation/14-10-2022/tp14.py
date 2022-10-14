from typing import List

lines: List[str] = []

with open('/Users/dk/Documents/studies/m1/front_back_separation/14-10-2022/temps.txt') as f:
    lines = f.readlines()

for line in lines:
    print(line.strip())
