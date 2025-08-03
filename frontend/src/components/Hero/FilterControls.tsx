import { IconFilter2 } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Select } from '@mantine/core';
import { INDUSTRIES } from '@/data/industries';
import { getAllCities } from '@/data/israelCities';
import { WORK_ARRANGEMENTS } from '@/data/workArr';
import { setSortOption } from '@/store/listingSlice';
import { RootState } from '@/store/store';

type FilterControlsProps = {
  isMobile: boolean;
};

export function FilterControls({ isMobile }: FilterControlsProps) {
  const dispatch = useDispatch();
  const sortOption = useSelector((state: RootState) => state.listingSlice.sortOption);
  const allCitiesArr = getAllCities();

  return (
    <Flex gap={10} align="center" direction={isMobile ? 'column' : 'row'}>
      {/* Region Filter - keeping for future functionality */}
      <Select
        w={isMobile ? '100%' : '50%'}
        placeholder="Region"
        rightSection={<IconFilter2 />}
        data={[
          { value: 'galilee', label: 'Galilee' },
          { value: 'golan', label: 'Golan' },
          { value: 'center', label: 'Center' },
          { value: 'jerusalem-district', label: 'Jerusalem District' },
          { value: 'south', label: 'South' },
        ]}
        value={sortOption}
        // onChange will be connected later for region filtering
        // onChange={(value) => {
        //   dispatch(setSortRegion(value || ''));
        // }}
      />

      {/* City Filter - keeping for future functionality */}
      <Select
        w={isMobile ? '100%' : '50%'}
        placeholder="City"
        rightSection={<IconFilter2 />}
        data={allCitiesArr.map((city) => ({ value: city, label: city }))}
        value={sortOption}
        // Will be connected to proper city filter later
        onChange={(value) => {
          dispatch(setSortOption(value || ''));
        }}
      />

      {/* Industry Filter - keeping for future functionality */}
      <Select
        w={isMobile ? '100%' : '50%'}
        placeholder="Industry"
        rightSection={<IconFilter2 />}
        data={INDUSTRIES.map((industry) => ({
          value: industry,
          label: industry,
        }))}
        value={sortOption}
        // Will be connected to proper industry filter later
        onChange={(value) => {
          dispatch(setSortOption(value || ''));
        }}
      />

      {/* Work Type Filter - keeping for future functionality */}
      <Select
        w={isMobile ? '100%' : '50%'}
        placeholder="Work Type"
        rightSection={<IconFilter2 />}
        data={WORK_ARRANGEMENTS.map((type) => ({
          value: type,
          label: type,
        }))}
        value={sortOption}
        // Will be connected to proper work type filter later
        onChange={(value) => {
          dispatch(setSortOption(value || ''));
        }}
      />
    </Flex>
  );
}