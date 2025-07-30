import { VendorLayout } from '../../../components';
import VendorDashboard from '../../../components/dashboards/VendorDash';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
];

export default function VendorDash() {
  return (
    <>
      <VendorLayout dashTitle={"Vendo Dashboard"}>
        {/* <VendorHomeTable ordersData={rows} /> */}
        <VendorDashboard />
      </VendorLayout>
    </>

  );
}
