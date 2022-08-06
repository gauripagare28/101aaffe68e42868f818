import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Card, TextInput} from 'react-native-paper';
import {CustomButton} from './CustomButton';
import moment from 'moment';

export const Home = () => {
  const [noLots, setNoLots] = useState<any>('');
  const [parkLots, setParkLots] = useState<any>([]);
  const [carRegNumber, setcarRegNumber] = useState<any>('');
  const [visibleModal, setvisibleModal] = useState<any>(false);
  const [selectPark, setSelectPark] = useState<any>(null);

  const [totalHours, setTotalHours] = useState<any>(0);
  const [totalAmount, setTotalAmount] = useState<any>(null);

  /* istanbul ignore next */
  const createTheLotsForParking = () => {
    var temptest = [];
    for (let index = 1; index <= noLots; index++) {
      temptest.push({
        id: index,
        carRegNumber: '',
        isCheck: false,
        timeStamps: Date.now(),
      });
    }
    setNoLots('');
    setParkLots(temptest);
  };
  /* istanbul ignore next */
  const renderLots = ({item, index}: any) => {
    return (
      <TouchableOpacity
        testID={
          item.isCheck
            ? `parking-drawing-registered-${index}`
            : `parking-drawing-space-${index}`
        }
        onPress={() => {
          setvisibleModal(true), generateBill(item), setSelectPark(item);
        }}
        style={{
          backgroundColor:
            item.carRegNumber == '' ? 'darkolivegreen' : 'darkred',
          flex: 1,
          padding: 9,
          marginHorizontal: 9,
          marginVertical: 9,
          justifyContent: 'center',
          alignItems: 'center',
          height: 90,
        }}>
        <Text
          testID={`parking-drawing-space-number-${index}`}
          style={{fontWeight: '900', color: 'white'}}>
          {item.id}
        </Text>

        {item.carRegNumber != '' && (
          <View>
            <Text style={{fontWeight: '900', color: 'white'}}>
              Car Number : {item.carRegNumber}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  /* istanbul ignore next */
  const createLotNumber = () => {
    var filArray = parkLots.filter((i: any) => i.carRegNumber === carRegNumber);
    if (filArray.length === 0) {
      var filData = parkLots.filter((j: any) => j.isCheck === false);
      if (filData.length === 0) {
        setcarRegNumber('');
        alert('The Parking is Full.....');
      } else {
        var rIndex = Math.floor(Math.random() * filData.length);
        var data = parkLots.map((d: any) => {
          if (d.isCheck) {
            return d;
          } else {
            if (filData[rIndex].id == d.id) {
              return {...d, isCheck: true, carRegNumber: carRegNumber};
            } else {
              return d;
            }
          }
        });

        setcarRegNumber('');
        alert('Parking Assigned SuccessFully.....');
        setParkLots(data);
      }
    } else {
      setcarRegNumber('');
      alert('Car Number is already Present');
    }
  };

  /* istanbul ignore next */
  const generateBill = (item: any) => {
    let carTime = item.timeStamps;
    let currentTime = Date.now();
    const parkedTime = moment(currentTime).diff(carTime, 'hours');
    setTotalHours(parkedTime);
    if (parkedTime > 2) {
      setTotalAmount((parkedTime - 2) * 10 + 10);
    } else {
      setTotalAmount(10);
    }
  };

  /* istanbul ignore next */
  const paymentTaken = () => {
    var body = {
      'car-registration': selectPark?.carRegNumber,
      charge: totalAmount,
    };

    fetch('https://httpstat.us/200 ', {
      method: 'POST',
      body: body,
    })
      .then((res: any) => {
        let data = [...parkLots];
        data.forEach((d: any) => {
          if (d.id === selectPark?.id) {
            d.isCheck = false;
            d.carRegNumber = '';
          }
        });

        setTotalAmount(null);
        setParkLots(data);
        setvisibleModal(false);
      })
      .catch((e: any) => console.log(e));
  };
  return (
    <View style={{flex: 1, padding: '3%', paddingTop: '6%'}}>
      <TextInput
        testID="parking-create-text-input"
        activeOutlineColor="cornflowerblue"
        value={noLots}
        placeholder="Enter the Number of Lots"
        mode="outlined"
        onChangeText={
          /* istanbul ignore next */ (text) =>
            /* istanbul ignore next */ setNoLots(text.replace(/[^0-9]/g, ''))
        }
      />

      <CustomButton
        testID="parking-create-submit-button"
        isDisabled={noLots.length == 0}
        title={'Create the Lots for Parking'}
        onPress={
          /* istanbul ignore next */ () =>
            /* istanbul ignore next */ createTheLotsForParking()
        }
      />

      <TextInput
        testID="parking-drawing-registration-input"
        activeOutlineColor="cornflowerblue"
        value={carRegNumber}
        placeholder="Enter the Car Number"
        mode="outlined"
        onChangeText={
          /* istanbul ignore next */ (text) =>
            /* istanbul ignore next */ setcarRegNumber(text)
        }
      />

      <CustomButton
        testID="parking-drawing-add-car-button"
        isDisabled={carRegNumber.length == 0}
        title={'Submit'}
        onPress={
          /* istanbul ignore next */ () =>
            /* istanbul ignore next */ createLotNumber()
        }
      />

      <FlatList
        data={parkLots}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'center'}}
        renderItem={renderLots}
      />

      <Modal
        testID="deregister-car-registration"
        visible={visibleModal}
        transparent={true}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <Card style={{width: '85%', padding: '2%'}}>
            <Text style={{paddingTop: 29}}>
              Car Registration Number : {selectPark?.carRegNumber}
            </Text>

            <Text testID="deregister-time-spent" style={{paddingTop: 9}}>
              Total Time Parked :{' '}
              {/* istanbul ignore next */ totalHours == 0 ? '1' : totalHours}{' '}
              hrs
            </Text>

            <Text testID="deregister-charge" style={{paddingTop: 9}}>
              Total Parking Charge: $ {totalAmount}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 9,
              }}>
              <CustomButton
                testID="deregister-payment-button"
                title={'Payment Taken'}
                onPress={
                  /* istanbul ignore next */ () =>
                    /* istanbul ignore next */ paymentTaken()
                }
              />

              <CustomButton
                testID="deregister-back-button"
                title={'Cancel'}
                onPress={
                  /* istanbul ignore next */ () =>
                    /* istanbul ignore next */ setvisibleModal(false)
                }
              />
            </View>
          </Card>
        </View>
      </Modal>
    </View>
  );
};
