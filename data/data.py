import pandas as pd

df = pd.read_csv('1976-2016-president.csv')
df.party.replace(to_replace="democratic-farmer-labor", value="democrat", inplace=True)
df = df[(df['party'] == 'republican') | (df['party'] == 'democrat')]
df = df[df.writein == False]
df['percentage'] = (df.candidatevotes / df.totalvotes * 100).round(decimals=2)
df.to_json('data.json', orient='index')