function getFormatValues() {
  const inputContainer = document.getElementById("order-details");
  const fieldList = inputContainer.querySelectorAll("input");
  const fieldArray = Array.from(fieldList);

  const payload = fieldArray.reduce(
    (obj, field) => {
      if (field.name === "items") {
        if (field.checked) {
          obj["order_value"] += parseInt(field.value);
        }
      } else {
        obj[field.name] = field.value;
      }
      return obj;
    },
    { folder_value: 0 }
  );
  console.log(payload);
  return payload;
}

async function getFee() {
  const payload = getFormatValues();
  const finalPayload = JSON.stringify(payload);

  const formInput = document.querySelector("form");

  if (formInput.checkValidity()) {
    const response = await fetch("/get-delivery-rate", {
      method: "POST",
      body: finalPayload,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        let resp = response.json();
        return resp;
      })
      .catch((reject) => {
        console.log(reject);
      });

    const deliveryFee = document.getElementById("fee");
    const clothingTotal = document.getElementById("price");
    const orderTotal = document.getElementById("total");

    clothingTotal.textContent = `$${(window.menuItems / 100).toFixed(2)}`;
    deliveryFee.textContent = `$${(response.data.fee / 100).toFixed(2)}`;
    orderTotal.textContent = `$${(
      (Number(window.menuItems) + response.data.fee) /
      100
    ).toFixed(2)}`;

    return response;
    // console.log("I filled it out");
  } else {
    console.log("fill out the form");
  }
}

async function createDelivery() {
  const payload = getFormatValues();
  const finalPayload = JSON.stringify(payload);

  const formInput = document.querySelector("form");

  const menuBoxes = document.querySelectorAll("input[type=checkbox]:checked");

  if (formInput.checkValidity() && menuBoxes.length > 0) {
    const response = await fetch("/create-delivery", {
      method: "POST",
      body: finalPayload,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        const resp = response.text();
        return resp;
      })
      .catch((reject) => {
        console.log(reject);
        return false;
      });
    if (response) {
      document.documentElement.innerHTML = response;
    } else {
      console.log("Error creating delivery");
    }
  } else if (formInput.checkValidity() && menuBoxes.length === 0) {
    alert("Please select a menu Item");
  } else {
    return;
  }
}
