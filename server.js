import express from 'express';
const app = express();
const PORT = 3000;
// Middleware a JSON formátumú kérések fogadásához
app.use(express.json());
// Memóriabeli adatbázis (kezdeti adatok)
let diakok = [
  { id: 101, nev: "Kovács Péter", szak: "Szoftverfejlesztő", atlag: 3.0},
  { id: 102, nev: "Nagy Anna", szak: "Hálózatépítő", atlag: 2.0 },
];
// 1. READ (GET): Összes diák lekérése
app.get('/api/diakok', (req, res) => {
    res.status(200).json(diakok);
});

app.get('/api/diakok/:id', (req,res) => {
  const id = Number(req.params.id);
  const diak = diakok.find(d =>d.id === id);

  if (!diak) {
    return res.status(404).json({message : "Tanuló nem található!"})
  }

  res.status(200).json(diak)

})

app.post('/api/diakok', (req,res) => {
     const {nev,szak, atlag} = req.body;

    const ujDiak = {
      id: diakok.length > 0 ? diakok[diakok.length -1].id + 1 : 101,
      nev,
      szak,
      atlag
    }

    if (atlag < 1.0 && atlag > 5.0) {
      return res.status(400).json({message : "Bad Request"})
    }

    diakok.push(ujDiak);

    res.status(201).json(ujDiak);
});

app.put('/api/diakok/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const diak = diakok.find(d => d.id === id);

  if (!diak) {
    return res.status(404).json({ uzenet: "A keresett diák nem található!" });
  }

  diak.nev = req.body.nev || diak.nev;
  diak.szak = req.body.szak || diak.szak;
  diak.atlag = req.body.atlag || diak.atlag;

  res.status(200).json(diak);
});


app.delete('/api/diakok/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = diakok.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ uzenet: "A törlendő diák nem található!" });
  }

  diakok.splice(index, 1);
  res.status(204).send("Sikeres törlés!");
});

// Szerver indítása
app.listen(PORT, () => {
console.log(`A szerver fut: http://localhost:${PORT}`);
});