// components/OdontogramaTable.js
const OdontogramaTable = () => {
  return (
    <div className="overflow-x-auto col-span-4 md:col-span-2">
      <h2 className="text-center text-lg mb-4">Odontograma</h2>
      <table className="table-auto mx-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Condición</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Sano</td>
            <td className="border border-gray-300 px-4 py-2 text-center align-middle">Sin marca</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Cariado</td>
            <td className="border border-gray-300 px-4 py-2 text-center align-middle">
              <span className="border-2 border-red-500 bg-red-500 rounded-full inline-block w-7 h-7"></span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Obturado</td>
            <td className="border border-gray-300 px-4 py-2 text-center align-middle">
              <span className="border-2 border-blue-500 bg-blue-500 rounded-full inline-block w-7 h-7"></span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">O.d. perdido</td>
            <td className="border border-gray-300 px-4 py-2 text-center align-middle">
              <span className="border-2 border-red-500 rounded-full inline-block w-7 h-7"></span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">O.d. reemplazado</td>
            <td className="border border-gray-300 px-4 py-2 text-center align-middle">
              <span className="border-2 border-blue-500 rounded-full inline-block w-7 h-7"></span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Ext. indicada</td>
            <td className="border border-gray-300 px-4 py-2 text-center align-middle">
              <span className="border-2 border-red-500 border-dashed rounded-full inline-block w-7 h-7"></span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Prótesis fija</td>
            <td className="border border-gray-300 px-4 py-2 text-center align-middle">
              <span className="border-2 border-black border-dashed rounded-full inline-block w-7 h-7"></span>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2">Prótesis parcial y removible</td>
            <td className="border border-gray-300 px-4 py-2 text-center align-middle">
              <span className="border-2 border-black border-dotted rounded-full inline-block w-7 h-7"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OdontogramaTable;
