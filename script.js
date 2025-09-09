document.addEventListener("DOMContentLoaded", () => {
  const dataList = document.getElementById("data-list");
  const searchInput = document.getElementById("search");

  function getData() {
    return JSON.parse(localStorage.getItem("dataDiri")) || [];
  }

  function saveData(data) {
    localStorage.setItem("dataDiri", JSON.stringify(data));
  }

  function renderData() {
    let data = getData();
    let search = searchInput.value.toLowerCase();

    dataList.innerHTML = "";

    let filtered = data.filter(
      (item) =>
        item.nama.toLowerCase().includes(search) ||
        item.umur.toString().includes(search) ||
        item.alamat.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {
      dataList.innerHTML = `<tr><td colspan="4" style="text-align:center;">Belum ada data</td></tr>`;
      return;
    }

    filtered.forEach((item, index) => {
      let row = document.createElement("tr");
      row.classList.add("fade-in");
      row.innerHTML = `
        <td>${item.nama}</td>
        <td>${item.umur}</td>
        <td>${item.alamat}</td>
        <td>
          <button class="btn btn-edit" onclick="editData(${index})">✏️ Edit</button>
          <button class="btn btn-delete" onclick="deleteData(${index})">🗑️ Hapus</button>
        </td>
      `;
      dataList.appendChild(row);
    });
  }

  // Hapus satu data
  window.deleteData = (index) => {
    let data = getData();
    Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        data.splice(index, 1);
        saveData(data);
        renderData();
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      }
    });
  };

  // Edit data → ke edit.html
  window.editData = (index) => {
    window.location.href = `edit.html?index=${index}`;
  };

  // Hapus semua data
  document.getElementById("delete-all").addEventListener("click", () => {
    let data = getData();
    if (data.length === 0) {
      Swal.fire("Info", "Tidak ada data untuk dihapus.", "info");
      return;
    }
    Swal.fire({
      title: "Hapus semua data?",
      text: "Semua data akan hilang permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Batal",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("dataDiri");
        renderData();
        Swal.fire("Terhapus!", "Semua data berhasil dihapus.", "success");
      }
    });
  });

  // Export JSON
  document.getElementById("export-json").addEventListener("click", () => {
    let data = getData();
    let blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
  });

  // Export CSV
  document.getElementById("export-csv").addEventListener("click", () => {
    let data = getData();
    let csv =
      "Nama,Umur,Alamat\n" +
      data.map((d) => `${d.nama},${d.umur},${d.alamat}`).join("\n");
    let blob = new Blob([csv], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  });

  // Sorting
  window.sortTable = (n) => {
    let data = getData();
    data.sort((a, b) => {
      let valA = Object.values(a)[n].toString().toLowerCase();
      let valB = Object.values(b)[n].toString().toLowerCase();
      return valA.localeCompare(valB, "id", { numeric: true });
    });
    saveData(data);
    renderData();
  };

  // Dark/Light mode
  const body = document.body;
  const toggleBtn = document.getElementById("toggleTheme");
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });

  searchInput.addEventListener("input", renderData);
  renderData();
});
