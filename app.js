class Registrant {
    constructor(name, age, money) {
      this.name = name;
      this.age = age;
      this.money = money;
    }
  
    static validate(name, age, money) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (name.length < 10) reject("Nama minimal 10 karakter");
          if (age < 25) reject("Umur minimal 25 tahun");
          if (money < 100000 || money > 1000000) reject("Uang sangu minimal 100 ribu dan maksimal 1 juta");
          resolve(true);
        }, 500); 
      });
    }
  }
  
  const registrants = [];
  
  document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const money = parseInt(document.getElementById('money').value);
  
    try {
      await Registrant.validate(name, age, money);
  
      const newRegistrant = new Registrant(name, age, money);
      registrants.push(newRegistrant);
  
      alert('Registrant successfully added!');
      this.reset(); 
  
      updateRegistrantList();
    } catch (error) {
      alert(error);
    }
  });
  
  function updateRegistrantList() {
    const tableBody = document.getElementById('registrantsTableBody');
    tableBody.innerHTML = ''; 
  
    let totalMoney = 0;
    let totalAge = 0;
  
    registrants.forEach((registrant) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="border border-gray-300 px-4 py-2">${registrant.name}</td>
        <td class="border border-gray-300 px-4 py-2">${registrant.age}</td>
        <td class="border border-gray-300 px-4 py-2">${registrant.money}</td>
      `;
      tableBody.appendChild(row);
  
      totalMoney += registrant.money;
      totalAge += registrant.age;
    });
  
    const averageMoney = totalMoney / registrants.length;
    const averageAge = totalAge / registrants.length;
    document.getElementById('averageSummary').innerText = `Rata-rata uang sangu: ${averageMoney.toFixed(2)} \n Rata-rata umur: ${averageAge.toFixed(2)}`;
  }
  
  document.getElementById('regTab').addEventListener('click', () => {
    document.getElementById('registrationForm').classList.remove('hidden');
    document.getElementById('registrantList').classList.add('hidden');
  });
  
  document.getElementById('listTab').addEventListener('click', () => {
    document.getElementById('registrationForm').classList.add('hidden');
    document.getElementById('registrantList').classList.remove('hidden');
  });
  