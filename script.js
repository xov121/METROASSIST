// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Page Elements
  const homePage = document.getElementById('home-page');
  const reportarTapadoPage = document.getElementById('reportar-tapado-page');
  const reportarMantenimientoPage = document.getElementById('reportar-mantenimiento-page');
  const roadsideAssistancePage = document.getElementById('roadside-assistance-page');
  const yaCerraronPage = document.getElementById('ya-cerraron-page');
  const unCarrilFormPage = document.getElementById('un-carril-form-page');

  // Buttons on Home Page
  const reportarTapadoBtn = document.getElementById('reportar-tapado-btn');
  const reportarMantenimientoBtn = document.getElementById('reportar-mantenimiento-btn');
  const roadsideAssistanceBtn = document.getElementById('roadside-assistance-btn');

  // Buttons on Reportar Mantenimiento Page
  const yaCerraronBtn = document.getElementById('ya-cerraron-btn');
  const backToHomeBtn2 = document.getElementById('back-to-home-btn-2');

  // Buttons on Ya Cerraron Page
  const unCarrilBtn = document.getElementById('un-carril-btn');
  const backToReportarMantenimientoBtn = document.getElementById('back-to-reportar-mantenimiento-btn');

  // Buttons on Un Carril Form Page
  const backToYaCerraronBtn2 = document.getElementById('back-to-ya-cerraron-btn-2');

  // Form and Generated Email Elements for Un Carril
  const unCarrilForm = document.getElementById('un-carril-form');
  const generatedEmailDivUnCarril = document.getElementById('generated-email-un-carril');
  const emailContentUnCarril = document.getElementById('email-content-un-carril');
  const copyEmailBtnUnCarril = document.getElementById('copy-email-btn-un-carril');

  // Elements for Reportar Tapado
  const tapadoForm = document.getElementById('tapado-form');
  const generatedEmailDivTapado = document.getElementById('generated-email');
  const emailContentTapado = document.getElementById('email-content');
  const copyEmailBtnTapado = document.getElementById('copy-email-btn');
  const backToHomeBtn = document.getElementById('back-to-home-btn');

  // Patrullero Container
  const patrullerosContainer = document.getElementById('patrulleros-container');
  const addPatrulleroBtn = document.getElementById('add-patrullero-btn');

  // Back to Home Button on Roadside Assistance Page
  const backToHomeBtn3 = document.getElementById('back-to-home-btn-3');

  // Event Listeners for Navigation Buttons
  reportarTapadoBtn.addEventListener('click', () => {
    showPage(reportarTapadoPage);
  });

  reportarMantenimientoBtn.addEventListener('click', () => {
    showPage(reportarMantenimientoPage);
  });

  roadsideAssistanceBtn.addEventListener('click', () => {
    showPage(roadsideAssistancePage);
  });

  backToHomeBtn2.addEventListener('click', () => {
    showPage(homePage);
  });

  backToHomeBtn3.addEventListener('click', () => {
    showPage(homePage);
  });

  yaCerraronBtn.addEventListener('click', () => {
    showPage(yaCerraronPage);
  });

  backToReportarMantenimientoBtn.addEventListener('click', () => {
    showPage(reportarMantenimientoPage);
  });

  unCarrilBtn.addEventListener('click', () => {
    showPage(unCarrilFormPage);
  });

  backToYaCerraronBtn2.addEventListener('click', () => {
    showPage(yaCerraronPage);
    resetUnCarrilForm();
  });

  // Back to Home Button on Reportar Tapado Page
  backToHomeBtn.addEventListener('click', () => {
    showPage(homePage);
    resetTapadoForm();
  });

  // Event Listeners for Add and Remove Patrullero
  addPatrulleroBtn.addEventListener('click', addPatrullero);

  patrullerosContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-patrullero-button')) {
      event.target.parentElement.remove();
    }
  });

  // Handle Form Submission for Un Carril
  unCarrilForm.addEventListener('submit', (e) => {
    e.preventDefault();
    generateEmailUnCarril();
  });

  // Handle Form Submission for Tapado de Hoyo
  tapadoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    generateTapadoEmail();
  });

  // Handle Copy Email Button for Un Carril
  copyEmailBtnUnCarril.addEventListener('click', () => {
    emailContentUnCarril.select();
    emailContentUnCarril.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Email copiado al portapapeles!');
  });

  // Handle Copy Email Button for Tapado de Hoyo
  copyEmailBtnTapado.addEventListener('click', () => {
    emailContentTapado.select();
    emailContentTapado.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Email copiado al portapapeles!');
  });

  // Function to Show a Specific Page
  function showPage(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach((p) => p.classList.remove('active'));

    // Show the selected page
    page.classList.add('active');
  }

  // Function to Reset the Un Carril Form
  function resetUnCarrilForm() {
    unCarrilForm.reset();
    generatedEmailDivUnCarril.style.display = 'none';
    emailContentUnCarril.value = '';
  }

  // Function to Reset the Tapado Form
  function resetTapadoForm() {
    tapadoForm.reset();
    patrullerosContainer.innerHTML = '';
    addPatrullero(); // Add initial Patrullero input
    generatedEmailDivTapado.style.display = 'none';
    emailContentTapado.value = '';
  }

  // Function to Generate the Email for Un Carril
  function generateEmailUnCarril() {
    // Gather Form Data
    const autopista = document.getElementById('autopista').value;
    const km = parseFloat(document.getElementById('km').value);
    const direccion = document.getElementById('direccion').value;
    const hora = document.getElementById('hora-un-carril').value;
    const nombreContratista = document.getElementById('nombre-contratista').value;
    const compania = document.getElementById('compania').value;
    const telefono = document.getElementById('telefono').value;
    const carril1 = document.getElementById('carril1').value;
    const descripcionTrabajo = document.getElementById('descripcion-trabajo').value;

    // Determine Pueblo and sig_pueblo based on autopista, km, and direccion
    const pueblo = obtenerPueblo(autopista, km);
    const sig_pueblo = obtenerSigPueblo(autopista, km, direccion);

    // Format Hora to 12-hour format with AM/PM
    const formattedHora = formatTimeTo12Hour(hora);

    // Construct the email message
    const email = `[${autopista} ${pueblo}]: A las ${formattedHora}, ${nombreContratista} de ${compania}, ${telefono}, informó que cerraron el carril ${carril1} en el km ${km} en dirección ${direccion}, hacia ${sig_pueblo}. Esto por trabajos de ${descripcionTrabajo}.`;

    // Display the generated email
    emailContentUnCarril.value = email;
    generatedEmailDivUnCarril.style.display = 'block';
  }

  // Function to Generate the Email for Tapado de Hoyo
  function generateTapadoEmail() {
    // Gather Form Data
    const hora = document.getElementById('hora-tapado').value;
    const autopista = document.getElementById('autopista-tapado').value;

    // Get all Patrullero/a names and units
    const patrulleroDivs = patrullerosContainer.querySelectorAll('.patrullero');
    const patrulleros = Array.from(patrulleroDivs).map((div) => {
      const nombre = div.querySelector('input[name="nombre-patrullero"]').value;
      const unidad = div.querySelector('select[name="unidad"]').value;
      return { nombre, unidad };
    });

    const lane = document.getElementById('lane').value;
    const kilometer = parseFloat(document.getElementById('kilometer').value);
    const sacos = document.getElementById('sacos').value;
    const direction = document.getElementById('direction').value;

    // Format time
    const formattedHora = formatTimeTo12Hour(hora);

    // Determine Pueblo and Next Pueblo
    const pueblo = obtenerPueblo(autopista, kilometer);
    const sig_pueblo = obtenerSigPueblo(autopista, kilometer, direction);

    // Construct the email message
    let email = `[${autopista} ${pueblo}] A las ${formattedHora} `;

    if (patrulleros.length === 1) {
      email += `El patrullero ${patrulleros[0].nombre} (${patrulleros[0].unidad}) realizó una reparación temporera de hoyo en el carril ${lane} en el km ${kilometer} en dirección ${direction}, hacia ${sig_pueblo}. `;
      email += `El patrullero utilizó ${sacos} sacos de asfalto frío.`;
    } else if (patrulleros.length > 1) {
      const nombresUnidades = patrulleros.map((p) => `${p.nombre} (${p.unidad})`);
      const patrullerosList = nombresUnidades.join(', ').replace(/, ([^,]*)$/, ' y $1');
      email += `los patrulleros ${patrullerosList} realizaron una reparación temporera de hoyo en el carril ${lane} en el km ${kilometer} en dirección ${direction}, hacia ${sig_pueblo}. `;
      email += `Los patrulleros utilizaron ${sacos} sacos de asfalto frío.`;
    }

    // Display the generated email
    emailContentTapado.value = email;
    generatedEmailDivTapado.style.display = 'block';
  }

  // Function to Format Time to 12-hour Format with AM/PM
  function formatTimeTo12Hour(time24) {
    if (!time24) return '';
    let [hour, minute] = time24.split(':');
    hour = parseInt(hour, 10);
    minute = minute || '00'; // Default to '00' if minute is undefined
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    return `${hour}:${minute} ${ampm}`;
  }

  // Function to Determine Pueblo based on Autopista and Km
  function obtenerPueblo(autopista, km) {
    const kmData = {
      'PR-52': [
        { start: 0.0, end: 9.8, pueblo: 'San Juan' },
        { start: 9.9, end: 31.8, pueblo: 'Caguas' },
        { start: 31.9, end: 48.3, pueblo: 'Cayey' },
        { start: 48.4, end: 71.6, pueblo: 'Salinas' },
        { start: 71.7, end: 81.7, pueblo: 'Santa Isabel' },
        { start: 81.8, end: 94.3, pueblo: 'Juana Diaz' },
        { start: 94.4, end: 108.5, pueblo: 'Ponce' },
      ],
      'PR-66': [
        { start: 0.0, end: 8.9, pueblo: 'Carolina' },
        { start: 9.0, end: 14.3, pueblo: 'Canovanas' },
        { start: 14.4, end: 19.5, pueblo: 'Rio Grande' },
      ],
      'PR-20': [
        { start: 0.0, end: 9.6, pueblo: 'Guaynabo' },
      ],
      // Other autopistas can be added here
    };

    const kmRanges = kmData[autopista];
    if (!kmRanges) {
      return 'Desconocido';
    }
    for (let i = 0; i < kmRanges.length; i++) {
      const range = kmRanges[i];
      if (km >= range.start && km <= range.end) {
        return range.pueblo;
      }
    }
    return 'Desconocido';
  }

  // Function to Determine sig_pueblo based on Autopista, Km, and Dirección
  function obtenerSigPueblo(autopista, km, direccion) {
    const kmData = {
      'PR-52': [
        { start: 0.0, end: 9.8, pueblo: 'San Juan' },
        { start: 9.9, end: 31.8, pueblo: 'Caguas' },
        { start: 31.9, end: 48.3, pueblo: 'Cayey' },
        { start: 48.4, end: 71.6, pueblo: 'Salinas' },
        { start: 71.7, end: 81.7, pueblo: 'Santa Isabel' },
        { start: 81.8, end: 94.3, pueblo: 'Juana Diaz' },
        { start: 94.4, end: 108.5, pueblo: 'Ponce' },
      ],
      'PR-66': [
        { start: 0.0, end: 8.9, pueblo: 'Carolina' },
        { start: 9.0, end: 14.3, pueblo: 'Canovanas' },
        { start: 14.4, end: 19.5, pueblo: 'Rio Grande' },
      ],
      'PR-20': [
        { start: 0.0, end: 9.6, pueblo: 'Guaynabo' },
      ],
      // Other autopistas can be added here
    };

    const kmIncreaseDirection = {
      'PR-52': ['Sur', 'S/B'],
      'PR-66': ['Este', 'E/B'],
      'PR-20': ['Sur', 'S/B'],
      // Add other autopistas
    };

    const kmRanges = kmData[autopista];
    if (!kmRanges) {
      return 'Desconocido';
    }

    let sigPueblo = 'Desconocido';

    const increasesKmDirections = kmIncreaseDirection[autopista] || [];
    const kmIncreases = increasesKmDirections.includes(direccion);

    if (kmIncreases) {
      // km increases in this direction, so we look for the next pueblo with higher km
      for (let i = 0; i < kmRanges.length; i++) {
        const range = kmRanges[i];
        if (km < range.start) {
          sigPueblo = range.pueblo;
          break;
        }
      }
      if (sigPueblo === 'Desconocido') {
        // If we didn't find a next pueblo, return the last one
        sigPueblo = kmRanges[kmRanges.length - 1].pueblo;
      }
    } else {
      // km decreases in this direction, so we look for the next pueblo with lower km
      for (let i = kmRanges.length - 1; i >= 0; i--) {
        const range = kmRanges[i];
        if (km > range.end) {
          sigPueblo = range.pueblo;
          break;
        }
      }
      if (sigPueblo === 'Desconocido') {
        // If we didn't find a previous pueblo, return the first one
        sigPueblo = kmRanges[0].pueblo;
      }
    }

    return sigPueblo;
  }

  // Function to Add a Patrullero
  function addPatrullero() {
    const div = document.createElement('div');
    div.className = 'patrullero';
    div.innerHTML = `
      <input type="text" name="nombre-patrullero" placeholder="Nombre Patrullero/a" required>
      <select name="unidad" required>
        <option value="">Unidad</option>
        ${[...Array(27).keys()]
          .map((i) => {
            const unitNumber = (i + 1).toString().padStart(2, '0');
            return `<option value="P-${unitNumber}">P-${unitNumber}</option>`;
          })
          .join('')}
      </select>
      <button type="button" class="remove-patrullero-button">Eliminar</button>
    `;
    patrullerosContainer.appendChild(div);
  }

   // New Elements for Reportar 218
   const reportar218Btn = document.getElementById('reportar-218-btn');
   const reportar218Page = document.getElementById('reportar-218-page');
   const form218 = document.getElementById('form-218');
   const backToHomeBtn218 = document.getElementById('back-to-home-btn-218');
   const generatedReportDiv218 = document.getElementById('generated-report-218');
   const reportContent218 = document.getElementById('report-content-218');
   const copyReportBtn218 = document.getElementById('copy-report-btn-218');
 
   // Vehículos
   const vehiculosContainer = document.getElementById('vehiculos-container');
   const addVehiculoBtn = document.getElementById('add-vehiculo-btn');
   let vehiculoCount = 1; // Start with Vehículo 1
 
   // Event Listener for Navigation Button
   reportar218Btn.addEventListener('click', () => {
     showPage(reportar218Page);
   });
 
   backToHomeBtn218.addEventListener('click', () => {
     showPage(homePage);
     resetForm218();
   });
 
   // Handle Form Submission for 218
   form218.addEventListener('submit', (e) => {
     e.preventDefault();
     generateReport218();
   });
 
   // Copy Report Button
   copyReportBtn218.addEventListener('click', () => {
     reportContent218.select();
     reportContent218.setSelectionRange(0, 99999); // For mobile devices
     document.execCommand('copy');
     alert('Reporte copiado al portapapeles!');
   });
 
   // Add Vehículo Button
   addVehiculoBtn.addEventListener('click', addVehiculo);
 
   // Remove Vehículo Buttons
   vehiculosContainer.addEventListener('click', function (event) {
     if (event.target.classList.contains('remove-vehiculo-button')) {
       const vehiculoNum = event.target.getAttribute('data-vehiculo');
       document.getElementById(`vehiculo-${vehiculoNum}`).remove();
     }
   });
 
   // Show/Hide Additional Fields Based on Selections
   document.getElementById('danos-propiedad').addEventListener('change', (e) => {
     const especificarDanosGroup = document.getElementById('especificar-danos-group');
     especificarDanosGroup.style.display = e.target.value === 'Si' ? 'block' : 'none';
   });
 
   document.getElementById('fatal').addEventListener('change', (e) => {
     const cantidadFatalGroup = document.getElementById('cantidad-fatal-group');
     cantidadFatalGroup.style.display = e.target.value === 'Si' ? 'block' : 'none';
   });
 
   document.getElementById('heridos').addEventListener('change', (e) => {
     const cantidadHeridosGroup = document.getElementById('cantidad-heridos-group');
     cantidadHeridosGroup.style.display = e.target.value === 'Si' ? 'block' : 'none';
   });
 
   document.getElementById('derrame').addEventListener('change', (e) => {
     const absorbenteGroup = document.getElementById('absorbente-group');
     absorbenteGroup.style.display = e.target.value === 'Si' ? 'block' : 'none';
   });
 
   // Function to Add Vehículo
   function addVehiculo() {
     vehiculoCount++;
     if (vehiculoCount > 3) {
       alert('No se pueden agregar más de 3 vehículos.');
       vehiculoCount = 3;
       return;
     }
 
     const vehiculoDiv = document.createElement('div');
     vehiculoDiv.className = 'vehiculo';
     vehiculoDiv.id = `vehiculo-${vehiculoCount}`;
     vehiculoDiv.innerHTML = `
       <h3><strong>Vehículo ${vehiculoCount}</strong> <button type="button" class="remove-vehiculo-button" data-vehiculo="${vehiculoCount}">Eliminar</button></h3>
       <div class="input-group">
         <label for="marca-${vehiculoCount}">Marca:</label>
         <input type="text" id="marca-${vehiculoCount}" name="marca-${vehiculoCount}">
       </div>
       <!-- Include all fields as per Vehículo 1 -->
       <!-- Modelo -->
       <div class="input-group">
         <label for="modelo-${vehiculoCount}">Modelo:</label>
         <input type="text" id="modelo-${vehiculoCount}" name="modelo-${vehiculoCount}">
       </div>
       <!-- Color -->
       <div class="input-group">
         <label for="color-${vehiculoCount}">Color:</label>
         <input type="text" id="color-${vehiculoCount}" name="color-${vehiculoCount}">
       </div>
       <!-- Año -->
       <div class="input-group">
         <label for="anio-${vehiculoCount}">Año:</label>
         <input type="number" id="anio-${vehiculoCount}" name="anio-${vehiculoCount}">
       </div>
       <!-- Tablilla -->
       <div class="input-group">
         <label for="tablilla-${vehiculoCount}">Tablilla:</label>
         <input type="text" id="tablilla-${vehiculoCount}" name="tablilla-${vehiculoCount}">
       </div>
       <!-- Conductor -->
       <div class="input-group">
         <label for="conductor-${vehiculoCount}">Conductor:</label>
         <input type="text" id="conductor-${vehiculoCount}" name="conductor-${vehiculoCount}">
       </div>
       <!-- Licencia -->
       <div class="input-group">
         <label for="licencia-${vehiculoCount}">Licencia:</label>
         <input type="text" id="licencia-${vehiculoCount}" name="licencia-${vehiculoCount}">
       </div>
       <!-- Teléfono -->
       <div class="input-group">
         <label for="telefono-${vehiculoCount}">Teléfono:</label>
         <input type="tel" id="telefono-${vehiculoCount}" name="telefono-${vehiculoCount}">
       </div>
       <!-- Dirección -->
       <div class="input-group">
         <label for="direccion-${vehiculoCount}">Dirección:</label>
         <input type="text" id="direccion-${vehiculoCount}" name="direccion-${vehiculoCount}">
       </div>
     `;
     vehiculosContainer.appendChild(vehiculoDiv);
     vehiculoDiv.style.display = 'block';
   }
 
   // Function to Reset Form 218
   function resetForm218() {
     form218.reset();
     // Remove Vehículo 2 and 3 if they exist
     for (let i = 2; i <= 3; i++) {
       const vehiculoDiv = document.getElementById(`vehiculo-${i}`);
       if (vehiculoDiv) {
         vehiculoDiv.remove();
       }
     }
     vehiculoCount = 1;
     generatedReportDiv218.style.display = 'none';
     reportContent218.value = '';
     // Hide conditional fields
     document.getElementById('especificar-danos-group').style.display = 'none';
     document.getElementById('cantidad-fatal-group').style.display = 'none';
     document.getElementById('cantidad-heridos-group').style.display = 'none';
     document.getElementById('absorbente-group').style.display = 'none';
   }
 
   // Function to Generate Report 218
   function generateReport218() {
     // Collect all form data
     const formData = new FormData(form218);
     const data = {};
     formData.forEach((value, key) => {
       data[key] = value;
     });
 
     // Construct the report content
     let report = `Fecha: ${data['fecha']}\n`;
     report += `Operador: ${data['operador']}\n`;
     report += `Hora llegada: ${data['hora-llegada']}\n`;
     report += `Hora terminado: ${data['hora-terminado']}\n\n`;
 
     report += `Tipo de Accidente: ${data['tipo-accidente']}\n`;
     report += `Autopista: ${data['autopista-218']}\n`;
     report += `Km: ${data['km-218']}\n`;
     report += `Localización: ${data['localizacion']}\n`;
     report += `Situación Climatológica: ${data['situacion-climatologica']}\n\n`;
 
     // Vehículos
     for (let i = 1; i <= vehiculoCount; i++) {
       if (document.getElementById(`vehiculo-${i}`)) {
         report += `Vehículo ${i}\n`;
         report += `Marca: ${data[`marca-${i}`] || 'N/A'}\n`;
         report += `Modelo: ${data[`modelo-${i}`] || 'N/A'}\n`;
         report += `Color: ${data[`color-${i}`] || 'N/A'}\n`;
         report += `Año: ${data[`anio-${i}`] || 'N/A'}\n`;
         report += `Tablilla: ${data[`tablilla-${i}`] || 'N/A'}\n`;
         report += `Conductor: ${data[`conductor-${i}`] || 'N/A'}\n`;
         report += `Licencia: ${data[`licencia-${i}`] || 'N/A'}\n`;
         report += `Teléfono: ${data[`telefono-${i}`] || 'N/A'}\n`;
         report += `Dirección: ${data[`direccion-${i}`] || 'N/A'}\n\n`;
       }
     }
 
     // Servicios adicionales
     report += `Servicios adicionales\n`;
     report += `Número de Querella: ${data['numero-querella']}\n`;
     report += `Nombre Policía: ${data['nombre-policia']}\n`;
     report += `Placa: ${data['placa']}\n`;
     report += `Cuartel: ${data['cuartel']}\n\n`;
 
     report += `Bombero: ${data['bombero']}\n`;
     report += `Ambulancia: ${data['ambulancia']}\n`;
     report += `Grúa: ${data['grua']}\n`;
     report += `Junta de Calidad Ambiental: ${data['jca']}\n`;
     report += `Comisión de Servicio Público: ${data['csp']}\n`;
     report += `Otro: ${data['otro-servicio'] || 'N/A'}\n\n`;
 
     // Descripción
     report += `Descripción\n`;
     report += `Causa: ${data['causa']}\n`;
     report += `Daños a la propiedad: ${data['danos-propiedad']}\n`;
     if (data['danos-propiedad'] === 'Si') {
       report += `Especificar: ${data['especificar-danos']}\n`;
     }
     report += `Fatal: ${data['fatal']}\n`;
     if (data['fatal'] === 'Si') {
       report += `Cantidad: ${data['cantidad-fatal']}\n`;
     }
     report += `Heridos: ${data['heridos']}\n`;
     if (data['heridos'] === 'Si') {
       report += `Cantidad: ${data['cantidad-heridos']}\n`;
     }
     report += `Derrame: ${data['derrame']}\n`;
     if (data['derrame'] === 'Si') {
       report += `Absorbente utilizado: ${data['absorbente-utilizado']}\n`;
     }
     report += `Otro: ${data['otro-descripcion'] || 'N/A'}\n`;
 
     // Display the report
     reportContent218.value = report;
     generatedReportDiv218.style.display = 'block';
   }

  // Initialize with one Patrullero input
  addPatrullero();
});
