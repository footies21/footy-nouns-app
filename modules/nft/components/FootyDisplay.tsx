import React, { useRef, useState } from 'react';
import Image from 'next/image';
import partsLib from '../../../modules/app/lib/partsLib.json';
import EditFootyNameInput from '../components/EditFootyNameInput';
import { getFootyImage } from '../util';
import { addDashToKitName } from '../../app/lib/utils';
import { Box, Card, Link, Text } from '@chakra-ui/react';

export function FootyDisplay({
  footyNoun,
  editMode,
  onFootyNamesChange,
  newFootyNames,
  displayOnly = false,
}: {
  footyNoun: any;
  editMode: boolean;
  onFootyNamesChange: any;
  newFootyNames: any;
  displayOnly?: boolean;
}) {
  if (!footyNoun) return null;

  const [footyNameDisplay, setFootyNameDisplay] = useState(footyNoun.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const newFootyName = displayOnly ? null : newFootyNames[footyNoun.id];

  const image = getFootyImage(footyNoun);

  return (
    <Card sx={{ flexDirection: 'column' }}>
      <Link
        href={`/footy/${footyNoun.tokenId}`}
        key={footyNoun.tokenId}
        title='View footy'
        sx={{ pb: 0 }}
      >
        <Box key={footyNoun.tokenId}>
          <Image
            src={image}
            width={256}
            height={256}
            alt={`footy noun ${footyNoun.tokenId}`}
          />
        </Box>
      </Link>
      <Box sx={{ mb: 2 }}>
        {editMode ? (
          <EditFootyNameInput
            inputRef={inputRef}
            onFootyNamesChange={(e) => onFootyNamesChange(e, footyNoun.id)}
            nonEditMode={() => (
              <Text variant='nounish' sx={{ textAlign: 'center', mb: 0 }}>
                {newFootyName
                  ? newFootyName
                  : footyNameDisplay
                  ? footyNameDisplay
                  : `Footy Noun #${footyNoun.id}`}
              </Text>
            )}
          />
        ) : (
          <Text variant='nounish' sx={{ textAlign: 'center', mb: 0 }}>
            {newFootyName
              ? newFootyName
              : footyNameDisplay
              ? footyNameDisplay
              : `Footy Noun #${footyNoun.id}`}
          </Text>
        )}
        <Text sx={{ textAlign: 'center', mb: 0 }}>
          <Link
            href={`/kit/${addDashToKitName(
              (partsLib as any).kits[footyNoun.kit],
            )}`}
            sx={{ textTransform: 'none', fontSize: '15px' }}
          >
            {(partsLib as any).kits[footyNoun.kit]}
          </Link>
        </Text>

        <Text variant='nounish' sx={{ textAlign: 'center', mb: 0 }}>
          {(partsLib as any).positions[footyNoun.number]}
        </Text>
      </Box>
    </Card>
  );
}
