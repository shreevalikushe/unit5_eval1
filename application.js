const express = require("express");

const allAddress = require("./address.json");
const validation = (req, res, next) => {
  req.body && next();
};
const app = express();
app.use(express.json());
app.listen(8000, () => {
  console.log("Hello listening");
});

app.get("/api/addresses", (req, res) => {
  console.log("Inside get");
  res.json(allAddress);
});

app.post("/api/addresses", validation, (req, res) => {
  let newAddress = [...allAddress, req.body];
  allAddress.push(req.body);
  res.json(newAddress);
});

app.put("/api/addresses/:id", (req, res) => {
  let { address } = req.body;

  const changedAddress = allAddress.map((item) =>
    Number(item.id) === Number(req.params.id)
      ? { ...item, address: address }
      : item
  );
  res.json(changedAddress);
});

app.delete("/api/addresses/:id", (req, res) => {
  const updatedList = allAddress.filter(
    (item) => Number(item.id) !== Number(req.params.id)
  );
  res.json(updatedList);
});
