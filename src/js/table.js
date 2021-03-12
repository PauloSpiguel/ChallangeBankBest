const containerData = document.getElementById("container-data");

const getData = () => {
  fetch(
    "https://github.com/PauloSpiguel/ChallangeBankBest/blob/ad1ac6ee0038dc9d6f02613bea5f36d10b735e85/src/data/db.json"
  )
    .then((response) => response.json())
    .then((response) => {
      response.forEach((item) => {
        let nodeSummary = document.createElement("tr");
        nodeSummary.setAttribute("id", `order${item.order}`);
        nodeSummary.setAttribute("scope", "row");

        let nodeDetails = document.createElement("tr");
        nodeDetails.classList.add("summary");

        nodeDetails.innerHTML = `
          <tr class="summary">
            <td>${item.created_at}</td>
            <td>${item.date_value}</td>
            <td>${item.operation}</td>
            <td>${item.description}</td>
            <td>${item.type}</td>
            <td>${item.amount} EUR</td>
            <td>${item.balance} EUR</td>
            <td>
              <button onclick="toggleCollapseDetails(this)" id="btn-show" type="button" data-bs-toggle="collapse"
                data-bs-target='#order${item.order}'>
                <i id="btn-plus" class="fas fa-plus"></i>
                <i id="btn-minus" class="fas fa-minus" style="display: none"></i>
              </button>
            </td>
          </tr>      
        `;

        nodeSummary.innerHTML = `
        <tr>
        <td colspan="8" class="hiddenRow">
          <div class="collapse" id='order${item.order}'>
            <div class="card card-body">
              <span>Detalhe do movimento</span>
              <div class="container-contents">
                <div class="col">
                  <div>
                    <strong>Conta origem</strong>
                    <span>${item.account}</span>
                  </div>
                  <div>
                    <strong>Movimento</strong>
                    <span>${item.operation}</span>
                  </div>
                  <div>
                    <strong>Descrição</strong>
                    <span>${item.description}</span>
                  </div>
                </div>
                <div class="col">
                  <div>
                    <strong>Data do movimento</strong>
                    <span>${item.created_at}</span>
                  </div>
                  <div>
                    <strong>Data valor</strong>
                    <span>${item.date_value}</span>
                  </div>
                  <div>
                    <strong>Valor</strong>
                    <span>${item.type === "D" && "-" + item.amount} EUR</span>
                  </div>
                  <div>
                    <strong>Saldo</strong>
                    <span>${item.balance} EUR</span>
                  </div>
                </div>
              </div>
              <button type="button" onclick="window.print()"><img src="/src/static/printer.svg"
                  alt="Print"></button>
            </div>
          </div>
          </div>
        </td>
      </tr>
        `;

        containerData.appendChild(nodeDetails);
        containerData.appendChild(nodeSummary);
      });
    });
};

const toggleCollapseDetails = (event) => {
  const btnPlus = event.querySelector("#btn-plus");
  const btnMinus = event.querySelector("#btn-minus");

  btnPlus.style.display = btnPlus.style.display === "none" ? "block" : "none";
  btnMinus.style.display = btnMinus.style.display === "none" ? "block" : "none";
};

const showInputSearch = (event) => {
  const container = event.parentNode;
  const input = container.querySelector("input");
  const span = container.querySelector("span");

  span.style.display = span.style.display === "none" ? "block" : "none";
  input.style.display = input.style.display === "none" ? "block" : "none";
  input.focus();
};

(() => {
  console.log("Loading table.js...");
  getData();
})();
