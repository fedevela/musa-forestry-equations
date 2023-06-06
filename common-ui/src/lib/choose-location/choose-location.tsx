import styles from './choose-location.module.css';
import { useRef, useEffect } from 'react';
import { Divider } from 'primereact/divider';
import { IKeyValueMap } from '../common-ui';

export interface ChooseLocationProps {
  onChangeAddressComponents: (acs: IKeyValueMap[]) => void;
  setShouldDisableNextButton: (sdnb: boolean) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  addressComponents: IKeyValueMap[];
  toast: any;
}

export function ChooseLocation(props: ChooseLocationProps) {
  const {
    setLatitude,
    setLongitude,
    onChangeAddressComponents,
    setShouldDisableNextButton,
    addressComponents,
    toast,
  } = props;
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const options = {
      fields: ['address_components', 'geometry', 'icon', 'name'],
      types: ['establishment'],
    };
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener('place_changed', async () => {
      const place = await autoCompleteRef.current.getPlace();
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
      const addressComponents: IKeyValueMap[] = place.address_components.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ac: { types: any[]; long_name: any }) => {
          const addressComponent: IKeyValueMap = {};
          addressComponent[`${ac.types[0]}`] = ac.long_name;
          return addressComponent;
        }
      );
      addressComponents.unshift({ name: place.name });
      onChangeAddressComponents(addressComponents);
      setShouldDisableNextButton(false);
      toast.current.show({
        severity: 'success',
        summary: 'Location chosen!',
        detail: `Latitude: ${place.geometry.location.lat()} - Longitude: ${place.geometry.location.lng()}`,
      });
    });
  }, [
    setLatitude,
    setLongitude,
    onChangeAddressComponents,
    setShouldDisableNextButton,
    toast,
  ]);

  return (
    <div className={styles['container']}>
      <div className="field">
        <label>Choose Location:</label>
        <input ref={inputRef} />
      </div>
      {addressComponents.length > 0 && (
        <>
          <Divider />
          <div className="field">
            <label>Chosen Location:</label>
            {addressComponents.reduce(
              (acc, val) => acc + ' ' + Object.values(val)[0],
              ''
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ChooseLocation;
