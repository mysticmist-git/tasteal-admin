import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

export default function CustomGridToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter placeholder="Tìm kiếm" />
    </GridToolbarContainer>
  );
}
