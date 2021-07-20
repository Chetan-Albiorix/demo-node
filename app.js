const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const course = [
  { id: 1, name: "jerry" },
  { id: 2, name: "Alan" },
  { id: 3, name: "Tom" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

// return a list of customer record
app.get("/api/customers", (req, res) => {
  res.send(course);
});

// get record based on conditionally routing a record
app.get("/api/customers/:id", (req, res) => {
  const customer = course.find(
    (customer) => customer.id === Number(req.params.id)
  );
  if (!customer) res.status(404).send("This Customer Id record not found");
  res.send(customer);
});

// add new record of customer
app.post("/api/customer", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(result.error.detail[0].message);
    return;
  }

  const customer = {
    id: course.length + 1,
    name: req.body.name,
  };
  course.push(customer);
  res.send(customer);
});

// update existing record of customer
app.put("/api/customers/:id", (req, res) => {
  const customer = course.find(
    (customer) => customer.id === Number(req.params.id)
  );
  if (!customer)
    return res.status(404).send("This Customer Id record not found");

  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(result.error.detail[0].message);

  customer.name = req.body.name;
  res.send(customer);
});

app.delete("/api/customers/:id", (req, res) => {
  const courseTemp = course.find(
    (customer) => customer.id === Number(req.params.id)
  );
  if (!courseTemp) return res.status(404).send("This Customer Id record not found");

  const index = course.findIndex((c) => c.id === Number(req.params.id));
  course.splice(index, 1);
  res.send(courseTemp);
});

function validateCustomer(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return Joi.validate(course, schema);
}

app.listen(3000, () => console.log("Listening on port 3000"));
