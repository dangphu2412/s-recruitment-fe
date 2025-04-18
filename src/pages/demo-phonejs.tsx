import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text
} from '@chakra-ui/react';
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString
} from 'libphonenumber-js';
import { NextPageWithLayout } from '../shared/models/next.types';
import { NoLayout } from '../shared/ui/NoLayout';

const countries = getCountries();

const PhoneInputForm: NextPageWithLayout = () => {
  const [country, setCountry] = useState<CountryCode>('US');
  const code = getCountryCallingCode(country);
  const [number, setNumber] = useState('');

  const fullPhone = `+${code} ${number}`;
  const isInvalid = !isValidPhoneNumber(fullPhone);
  const phone = parsePhoneNumberFromString(fullPhone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Box maxW="sm" mx="auto" mt={10}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Country Code</FormLabel>
          <Select
            value={country}
            onChange={e => setCountry(e.target.value as CountryCode)}
          >
            {countries.map(country => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={4} isInvalid={isInvalid}>
          <FormLabel>Phone Number</FormLabel>

          <InputGroup>
            <InputLeftAddon>+{code}</InputLeftAddon>
            <Input
              type="tel"
              placeholder="Enter phone number"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          </InputGroup>
          {isInvalid && (
            <FormErrorMessage>Invalid phone number</FormErrorMessage>
          )}
        </FormControl>

        <div className={'space-y-4'}>
          <Text>Full Phone: {fullPhone}</Text>
          <Text>Is valid: {isValidPhoneNumber(fullPhone).toString()}</Text>
          <Text>
            <strong>International</strong> {phone?.formatInternational()}
          </Text>
          <Text>
            <strong>Country parsed from full</strong> {phone?.country}
          </Text>

          <Text>
            <strong>Calling code parsed from full</strong>{' '}
            {phone?.countryCallingCode}
          </Text>
        </div>
      </form>
    </Box>
  );
};

PhoneInputForm.getLayout = NoLayout;

export default PhoneInputForm;
