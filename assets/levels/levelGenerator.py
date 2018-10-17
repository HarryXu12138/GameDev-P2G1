import random

for i in range(90):
  pointPos = random.randint(0, 5);
  s = ""
  for x in range(5):
    if (x == pointPos):
      s += "1"
    elif random.random() < .2:
      s += "2"
    else:
      s += "0"
  print(s)