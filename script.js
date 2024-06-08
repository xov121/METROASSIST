document.addEventListener('DOMContentLoaded', () => {
  const tabHeaders = document.querySelectorAll('.tab-header');
  const tabContents = document.querySelectorAll('.tab-content');

  tabHeaders.forEach(header => {
      header.addEventListener('click', () => {
          const target = header.dataset.tab;
          tabHeaders.forEach(h => h.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));
          header.classList.add('active');
          document.getElementById(target).classList.add('active');
      });
  });
});

function generateDraft() {
  const highway = document.getElementById('highway').value;
  const lanesOccupied = Array.from(document.querySelectorAll('input[name="lanesOccupied"]:checked')).map(checkbox => checkbox.value);
  const lanesOpen = Array.from(document.querySelectorAll('input[name="lanesOpen"]:checked')).map(checkbox => checkbox.value);
  const direction = document.getElementById('direction').value;
  const time = document.getElementById('time').value;
  const reporterPosition = document.getElementById('reporterPosition').value;
  const reporter = document.getElementById('reporter').value;
  const kilometer = document.getElementById('kilometer').value;
  const town = document.getElementById('town').value;
  const town2 = document.getElementById('town2').value;
  const policeInformed = document.getElementById('policeInformed').checked;
  const policeOnScene = document.getElementById('policeOnScene').checked;
  const agencies = Array.from(document.querySelectorAll('input[name="agencies"]:checked')).map(checkbox => checkbox.value);
  const propertyDamage = document.getElementById('propertyDamage').checked;
  const damageDescription = document.getElementById('damageDescription').value;
  const injuries = Array.from(document.querySelectorAll('input[name="injuries"]:checked')).map(checkbox => checkbox.value);
  const situations = Array.from(document.querySelectorAll('input[name="situations"]:checked')).map(checkbox => checkbox.value);

  const timeParts = time.split(':');
  let hours = parseInt(timeParts[0]);
  const minutes = timeParts[1];
  let period = 'AM';

  if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
          hours -= 12;
      }
  } else if (hours === 0) {
      hours = 12;
  }

  const formattedTime = `${hours}:${minutes} ${period}`;

  let policeStatus = "";
  if (policeOnScene) {
      policeStatus = "";
  } else if (policeInformed) {
      policeStatus = "La policía ha sido informada de la situación y está en camino.";
  } else {
      policeStatus = "La policía no ha sido informada de la situación.";
  }

  let agenciesText = "No hay agencias en el lugar.";
  if (agencies.length > 0) {
      if (agencies.length === 1) {
          agenciesText = `En el lugar se encuentra ${agencies[0]}.`;
      } else if (agencies.length === 2) {
          agenciesText = `En el lugar se encuentran ${agencies[0]} y ${agencies[1]}.`;
      } else {
          const lastAgency = agencies.pop();
          agenciesText = `En el lugar se encuentran ${agencies.join(', ')}, y ${lastAgency}.`;
      }
  }

  let propertyDamageText = "No se reportan daños a la propiedad de Metropistas.";
  if (propertyDamage) {
      propertyDamageText = `Los daños a la propiedad de Metropistas incluyen: ${damageDescription}.`;
  }

  let injuriesText = "No se reportan heridos.";
  if (injuries.length > 0) {
      if (injuries.length === 1) {
          injuriesText = `Se reporta ${injuries[0]}.`;
      } else if (injuries.length === 2) {
          injuriesText = `Se reportan ${injuries[0]} y ${injuries[1]}.`;
      } else {
          const lastInjury = injuries.pop();
          injuriesText = `Se reportan ${injuries.join(', ')}, y ${lastInjury}.`;
      }
  }

  let reporterInfo = reporterPosition ? `por ${reporterPosition} ${reporter}` : `por ${reporter}`;

  let lanesDescription = "";
  let totalClosure = false;
  let singleLaneClosure = false;
  let shoulderOnly = false;

  if (lanesOccupied.length === 1) {
      if (lanesOccupied[0].includes("paseo")) {
          lanesDescription = `el ${lanesOccupied[0]}`;
          shoulderOnly = true;
      } else {
          lanesDescription = `el carril ${lanesOccupied[0]}`;
          singleLaneClosure = true;
      }
  } else if (lanesOccupied.length === 2 && lanesOccupied.some(lane => lane.includes("paseo"))) {
      const paseo = lanesOccupied.find(lane => lane.includes("paseo"));
      const carril = lanesOccupied.find(lane => !lane.includes("paseo"));
      lanesDescription = `el ${paseo} y el carril ${carril}`;
      singleLaneClosure = true;
  } else if (lanesOccupied.length > 2 && lanesOccupied.includes("izquierdo") && lanesOccupied.includes("central") && lanesOccupied.includes("derecho")) {
      lanesDescription = `con cierre total de autopista en dirección ${direction}`;
      totalClosure = true;
  } else if (lanesOccupied.length > 1) {
      const paseos = lanesOccupied.filter(lane => lane.includes("paseo"));
      const carriles = lanesOccupied.filter(lane => !lane.includes("paseo"));
      if (paseos.length > 0 && carriles.length > 0) {
          lanesDescription = `el ${paseos.join(' y el ')} y los carriles ${carriles.join(' y ')}`;
      } else {
          lanesDescription = `los carriles ${lanesOccupied.join(', ')}`;
      }
      singleLaneClosure = true;
  }

  let lanesOpenDescription = "";
  if (lanesOpen.length > 0) {
      lanesOpenDescription = `Los carriles abiertos al tráfico son: ${lanesOpen.join(', ')}.`;
  } else {
      lanesOpenDescription = "No hay carriles abiertos al tráfico.";
  }

  const draft = `[${highway}] A las ${formattedTime} se reporta un accidente vehicular ${reporterInfo}. Al momento, el accidente está localizado en el km ${kilometer} en dirección ${direction} y está ocupando ${lanesDescription}. ${lanesOpenDescription} ${policeStatus} ${agenciesText} ${propertyDamageText} ${injuriesText}`;

  let subject = `[${highway}] Accidente Vehicular km ${kilometer} ${direction}`;
  if (propertyDamage) {
      subject += " con daños";
  }

  let instructions = [];

  if (situations.includes("3.2.1")) {
      instructions.push("3.2.1\nLlamadas: Marilyn Reyes, Waldemar Martinez o Julio Torres. Estos se encargaran de comunicarse con Aida Merlin.\n\n");
      instructions.push("Notificación por Twitter a traves de SocialPilot.\n\n");
      instructions.push("Notificación por correo electrónico: GRUPO CENTRO\nCopiar (CC) a:\nJulian Fernandez (CEO)(6)\nIris Huertas (Gerente de Negocios y Clientes)\nWilmarie Rivera (Gerente de Comunicaciones y Relaciones Publicas).\n \nGRUPO ACT y Luz-Marie Falcon (8).\n\n(6) Se copia unicamente si es cierre total de autopista.\n(8) Se les notifica en un correo aparte al momento del cierre y luego en la apertura de la autopista.\n\n");
  }

  if (situations.includes("3.2.2")) {
      instructions.push("3.2.2\nLlamadas: Marilyn Reyes, Waldemar Martinez o Julio Torres. Estos se encargaran de comunicarse con Aida Merlin.\n\n");
      instructions.push("Notificación por correo electrónico: GRUPO CENTRO y GRUPO EMERGENCIAS.\n\n");
  }

  if (situations.includes("3.2.3")) {
      instructions.push("3.2.3\nNotificación por correo electrónico: GRUPO CENTRO y GRUPO CONSERVACIÓN (7).\nCopiar (CC) a:\nIris Huertas (Gerente de Negocios y Clientes)\nLiliana Rivera (Analista de Reclamaciones)\n\n(7) GRUPO CONSERVACIÓN se comienza a copiar cuando se identifica el daño.\n\n");
  }

  if (situations.includes("3.2.4")) {
      instructions.push("3.2.4\nEmpleado INTERNO (de Metropistas)\nLlamadas: Marilyn Reyes, Waldemar Martinez o Julio Torres. Estos se encargaran de comunicarse con Aida Merlin. Aida Merlin se encarga de comunicarse con Jorge Veci (COO), Aida Gomez (Senior Manager Personas y Organización) y Barbara Sanchez (Gerente de Salud, Seguridad Ocupacional y Medio Ambiente).\n\n");
      instructions.push("Notificación por correo electrónico: GRUPO CENTRO y GRUPO EMERGENCIAS.\nCopiar (CC) a Julian Fernandez (CEO).\n\n\n");
      instructions.push("Empleado EXTERNO (contratista)\nLlamadas: Marilyn Reyes, Waldemar Martinez o Julio Torres. Estos se encargaran de comunicarse con Aida Merlin. Aida Merlin se encarga de comunicarse con Barbara Sanchez (Gerente de Salud, Seguridad Ocupacional y Medio Ambiente).\n\n");
      instructions.push("Notificación por correo electrónico: GRUPO CENTRO y GRUPO EMERGENCIAS.\n\n");
  }

  if (situations.includes("3.2.5")) {
      instructions.push("3.2.5\nNotificación por correo electrónico: GRUPO CENTRO\n\n");
  }

  document.getElementById('instructions').innerText = instructions.length > 0 ? instructions.join(' ') : "No hay instrucciones específicas para este incidente.";
  document.getElementById('subject').innerText = subject;
  document.getElementById('draft').innerText = draft;
}

function generateTweet() {
  const highway = document.getElementById('highway').value;
  const kilometer = document.getElementById('kilometer').value;
  const direction = document.getElementById('direction').value;
  const town = document.getElementById('town').value;
  const town2 = document.getElementById('town2').value;
  const lanes = Array.from(document.querySelectorAll('input[name="lanesOccupied"]:checked')).map(checkbox => checkbox.value).join(', ');

  let tweetTemplate = '';
  const tweetType = document.querySelector('input[name="tweetType"]:checked').value;

  switch (tweetType) {
      case 'choque':
          tweetTemplate = `[${highway} ${town}] Choque entre dos vehículos en el km ${kilometer} en dirección a ${town2} con cierre del ${lanes}. Reduzca la velocidad.`;
          break;
      case 'choqueMultiple':
          tweetTemplate = `[${highway} ${town}] Choque múltiple en el km ${kilometer} en dirección a ${town2} con cierre del ${lanes}. Reduzca la velocidad.`;
          break;
      case 'cierreAutopista':
          tweetTemplate = `[${highway} ${town}] Cierre de autopista en el km ${kilometer} en dirección a ${town2} por trabajos en la vía. Use vías alternas.`;
          break;
      case 'derrame':
          tweetTemplate = `[${highway} ${town}] Choque con derrame de combustible/aceite en el km ${kilometer} en dirección a ${town2} con cierre del ${lanes}. Reduzca la velocidad.`;
          break;
      case 'camionDesperfecto':
          tweetTemplate = `[${highway} ${town}] Camión con desperfecto mecánico en espera de remolque en el km ${kilometer} en dirección a ${town2} con cierre del ${lanes}. Reduzca la velocidad.`;
          break;
      case 'continuaCierre':
          tweetTemplate = `[${highway} ${town}] Continúa cierre de autopista en el km ${kilometer} en dirección a ${town2} por choque. Use vías alternas.`;
          break;
      case 'reabreAutopista':
          tweetTemplate = `[${highway} ${town}] Se reabre autopista en el km ${kilometer} en dirección a ${town2}.`;
          break;
      case 'congestionVehicular':
          tweetTemplate = `[${highway} ${town}] Congestión vehicular desde el km ${kilometer} hasta el km ${kilometer} en dirección a ${town2} por investigación policiaca.`;
          break;
      case 'cierreSalida':
          tweetTemplate = `[${highway} ${town}] Cierre de Salida en el km ${kilometer} en dirección a ${town2} por investigación policiaca. Use vías alternas.`;
          break;
      case 'cierreCarril':
          tweetTemplate = `[${highway} ${town}] Cierre de carril en el km ${kilometer} en dirección a ${town2} por incidente con camión en la vía.`;
          break;
      case 'acumulacionAgua':
          tweetTemplate = `[${highway} ${town}] Cierre de carril en el km ${kilometer} en dirección a ${town2} por acumulación de agua.`;
          break;
      case 'cierreDTL':
          tweetTemplate = `[${highway} ${town}] Cierre del carril expreso (DTL) en el km ${kilometer} en dirección a ${town2} por choque dentro del carril.`;
          break;
      case 'congestionPR18':
          tweetTemplate = `[${highway} ${town}] Congestión vehicular del km ${kilometer} al km ${kilometer} en dirección a ${town2} por choque en la PR-18 (Exp. Las Américas).`;
          break;
      case 'congestionTunel':
          tweetTemplate = `[${highway} ${town}] Congestión vehicular del km ${kilometer} al km ${kilometer} en dirección a ${town2} por dentro del Túnel de Minillas.`;
          break;
      case 'cierreTemporero':
          tweetTemplate = `[${highway} ${town}] Cierre temporero del carril dinámico (DTL) por congestión en dirección hacia ${town2}.`;
          break;
      case 'aperturaDTL':
          tweetTemplate = `[${highway} ${town}] Apertura del carril dinámico (DTL) en dirección hacia ${town2}.`;
          break;
  }

  const tweet = `${tweetTemplate}\n\n@dronchinita\n@dtop\n@skytrafficpr\n@actprgov\n@metropistas`;
  document.getElementById('tweet').innerText = tweet;
}

function generateFinalReport() {
  const v1Marca = document.getElementById('v1Marca').value;
  const v1Modelo = document.getElementById('v1Modelo').value;
  const v1Color = document.getElementById('v1Color').value;
  const v1Anio = document.getElementById('v1Anio').value;
  const v1Tablilla = document.getElementById('v1Tablilla').value;
  const v1Conductor = document.getElementById('v1Conductor').value;
  const v1Licencia = document.getElementById('v1Licencia').value;
  const v1Telefono = document.getElementById('v1Telefono').value;
  const v1Direccion = document.getElementById('v1Direccion').value;

  const v2Marca = document.getElementById('v2Marca').value;
  const v2Modelo = document.getElementById('v2Modelo').value;
  const v2Color = document.getElementById('v2Color').value;
  const v2Anio = document.getElementById('v2Anio').value;
  const v2Tablilla = document.getElementById('v2Tablilla').value;
  const v2Conductor = document.getElementById('v2Conductor').value;
  const v2Licencia = document.getElementById('v2Licencia').value;
  const v2Telefono = document.getElementById('v2Telefono').value;
  const v2Direccion = document.getElementById('v2Direccion').value;

  const v3Marca = document.getElementById('v3Marca').value;
  const v3Modelo = document.getElementById('v3Modelo').value;
  const v3Color = document.getElementById('v3Color').value;
  const v3Anio = document.getElementById('v3Anio').value;
  const v3Tablilla = document.getElementById('v3Tablilla').value;
  const v3Conductor = document.getElementById('v3Conductor').value;
  const v3Licencia = document.getElementById('v3Licencia').value;
  const v3Telefono = document.getElementById('v3Telefono').value;
  const v3Direccion = document.getElementById('v3Direccion').value;

  const numQuerella = document.getElementById('numQuerella').value;
  const nombrePolicia = document.getElementById('nombrePolicia').value;
  const placa = document.getElementById('placa').value;
  const cuartel = document.getElementById('cuartel').value;
  const operadorAsiste = document.getElementById('operadorAsiste').value;
  const descripcion = document.getElementById('descripcion').value;
  const causa = document.getElementById('causa').value;
  const heridos = document.getElementById('heridos').value;
  const fatales = document.getElementById('fatales').value;
  const danosPropiedad = document.getElementById('danosPropiedad').value;
  const pavimento = document.getElementById('pavimento').value;
  const derrame = document.getElementById('derrame').value;

  const finalReport = `
      <h3>Vehículo 1</h3>
      <p>Marca: ${v1Marca}</p>
      <p>Modelo: ${v1Modelo}</p>
      <p>Color: ${v1Color}</p>
      <p>Año: ${v1Anio}</p>
      <p>Tablilla: ${v1Tablilla}</p>
      <p>Conductor: ${v1Conductor}</p>
      <p>Licencia: ${v1Licencia}</p>
      <p>Teléfono: ${v1Telefono}</p>
      <p>Dirección: ${v1Direccion}</p>
      <h3>Vehículo 2</h3>
      <p>Marca: ${v2Marca}</p>
      <p>Modelo: ${v2Modelo}</p>
      <p>Color: ${v2Color}</p>
      <p>Año: ${v2Anio}</p>
      <p>Tablilla: ${v2Tablilla}</p>
      <p>Conductor: ${v2Conductor}</p>
      <p>Licencia: ${v2Licencia}</p>
      <p>Teléfono: ${v2Telefono}</p>
      <p>Dirección: ${v2Direccion}</p>
      <h3>Vehículo 3</h3>
      <p>Marca: ${v3Marca}</p>
      <p>Modelo: ${v3Modelo}</p>
      <p>Color: ${v3Color}</p>
      <p>Año: ${v3Anio}</p>
      <p>Tablilla: ${v3Tablilla}</p>
      <p>Conductor: ${v3Conductor}</p>
      <p>Licencia: ${v3Licencia}</p>
      <p>Teléfono: ${v3Telefono}</p>
      <p>Dirección: ${v3Direccion}</p>
      <h3>Servicios adicionales</h3>
      <p>Núm. Querella: ${numQuerella}</p>
      <p>Nombre Policía: ${nombrePolicia}</p>
      <p>Placa: ${placa}</p>
      <p>Cuartel: ${cuartel}</p>
      <p>Operador que asiste: ${operadorAsiste}</p>
      <p>Descripción: ${descripcion}</p>
      <p>Causa: ${causa}</p>
      <p>Heridos: ${heridos}</p>
      <p>Fatales: ${fatales}</p>
      <p>Daños a la propiedad: ${danosPropiedad}</p>
      <p>Pavimento: ${pavimento}</p>
      <p>Derrame: ${derrame}</p>
  `;

  document.getElementById('finalReportOutput').innerHTML = finalReport;
}
