import { memo, useMemo } from "react";
import { Image, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as format from "lib/format";
import { getCountryName } from "lib/country";
import { select } from "picofly/react";
import { item } from "lib/selectors";
import Text from "ui/views/text";
import { common as ct } from "i18n";
import s from "ui/styles";

export default select(item("cred"))(NewBelarusPassport);

function NewBelarusPassport({ cred = {} }) {
  const { type, credentialSubject } = cred;
  const {
    docId,
    firstName,
    lastName,
    dateOfBirth,
    gender,
    country,
    nationality,
    personId,
    issuedAt,
    validUntil,
    photo,
  } = credentialSubject;

  const title = ct.credName[type];
  const imgSource = useMemo(() => photo && { uri: photo }, [photo]);
  const dateOfBirthStr = dateOfBirth && format.date(new Date(dateOfBirth));
  const nationalityStr = getCountryName(nationality);
  const issuedAtStr = issuedAt && format.date(new Date(issuedAt));
  const validUntilStr = validUntil && format.date(new Date(validUntil));
  const genderStr = ct.gender[gender] ?? gender;

  return (
    <View style={s`card shadow btw3 bcPrimary`}>
      <View style={s`row aic pv4 jcsb`}>
        <Icon name="passport" size={24} style={s`primary`} />
        <Text style={s`pv4 primary tc fs18 fw500 ttu`}>{title}</Text>
        <View style={s`w32 h24 aic jcc br12 bw2 bcPrimary`}>
          <Text style={s`primary b`}>{country}</Text>
        </View>
      </View>

      <View style={s`row pv16 btw1 bcPrimary`}>
        {imgSource && (
          <Image source={imgSource} style={s`w128 h128 mr16 br4`} />
        )}
        <View style={s`f1`}>
          <View style={s`mb4 row aic wrap`}>
            <Text style={s`f1 fw500 ttu tvc`}>
              {firstName} {lastName}
            </Text>
            <Text style={s`ml8 fw500 bw1 br4 ph4 bcPrimary primary`}>
              {docId}
            </Text>
          </View>

          <Row title={ct.credField.dateOfBirth} value={dateOfBirthStr} />
          <Row title={ct.credField.nationality} value={nationalityStr} />
          <Row title={ct.credField.gender} value={genderStr} />
          <Row title={ct.credField.personId} value={personId} />
          <Row title={ct.credField.issuedAt} value={issuedAtStr} />
          <Row title={ct.credField.validUntil} value={validUntilStr} />
        </View>
      </View>
    </View>
  );
}

const Row = memo(
  ({ title, value, style }) =>
    value && (
      <View style={s("mt4 row wrap", style)}>
        <Text style={s`mr8 primary fw500`}>{title}:</Text>
        <Text style={s`fw500`}>{value}</Text>
      </View>
    ),
);
