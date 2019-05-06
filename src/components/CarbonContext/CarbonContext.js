import React, { useContext } from 'react';
import warning from 'warning';

const defaultFlagValues = {
  rightToLeft: false,
  UIShell: false,
};

const flagNames = Object.keys(defaultFlagValues);

export const CarbonContext = React.createContext(defaultFlagValues);

export const CarbonProvider = React.memo(function CarbonProvider({
  children,
  flags,
}) {
  const value = defaultFlagValues;
  flags.forEach(flag => {
    const validFlag = flagNames.includes(flag);
    warning(
      validFlag,
      `The flag '${flag}' given to CarbonProvider was not recognized. Please use one of the following: ${flagNames.join(
        ', '
      )}`
    );
    value[flag] = validFlag;
  });

  return (
    <CarbonContext.Provider value={value}>{children}</CarbonContext.Provider>
  );
});

export const useCarbonFlag = flag => {
  const validFlag = flagNames.includes(flag);
  const carbonFlags = useContext(CarbonContext);
  warning(
    validFlag,
    `The flag '${flag}' given to useCarbonFlag was not recognized. Please use one of the following: ${flagNames.join(
      ', '
    )}`
  );
  return validFlag ? carbonFlags[flag] : false;
};
