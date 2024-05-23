import React, { useState } from 'react';
import { BiEdit, BiCheck, BiX } from 'react-icons/bi';
import { Flex, Input, Text, Button } from '@chakra-ui/react';

function EditFootyNameInput({
  inputRef,
  onFootyNamesChange,
  nonEditMode,
}: {
  inputRef: any;
  onFootyNamesChange: (e: any) => void;
  nonEditMode: any;
}) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  return (
    <>
      {isEditing ? (
        <div>
          <Flex sx={{ justifyContent: 'center' }}>
            <Input
              ref={inputRef}
              type='text'
              id='newClubName'
              sx={{
                fontFamily: 'Londrina Solid',
                textAlign: 'center',
                border: 'solid 1px black',
                borderRadius: '10px',
                padding: '0.4rem',
                width: '100%',
              }}
              placeholder='New Footy Name'
              onChange={onFootyNamesChange}
            />
          </Flex>
          <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant='secondary'
              className='save-button'
              onClick={toggleIsEditing}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BiCheck />
              <Text as='span' sx={{ ml: 2 }}>
                Save
              </Text>
            </Button>
            <Button
              variant='secondary'
              onClick={toggleIsEditing}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BiX />
              <Text as='span' sx={{ ml: 2 }}>
                Cancel
              </Text>
            </Button>
          </Flex>
        </div>
      ) : (
        <>
          {nonEditMode()}
          <Flex sx={{ justifyContent: 'center' }}>
            <Button
              variant='outline'
              onClick={toggleIsEditing}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <BiEdit />
              <Text as='span' sx={{ ml: 2 }} variant='nounish'>
                Edit Name
              </Text>
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}

export default EditFootyNameInput;
