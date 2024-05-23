import React, { useState } from 'react';
import { BiEdit, BiCheck, BiX } from 'react-icons/bi';
import { Box, Flex, Text, Button } from '@chakra-ui/react';

function EditClubNameInput({
  inputRef,
  onClubNameChange,
  nonEditMode,
}: {
  inputRef: any;
  onClubNameChange: (e: any) => void;
  nonEditMode: any;
}) {
  const [isEditing, setIsEditing] = useState(false);

  function toggleIsEditing() {
    setIsEditing(!isEditing);
  }

  return (
    <>
      {isEditing ? (
        <Box>
          <input
            ref={inputRef}
            type='text'
            id='newClubName'
            className='club-name-input'
            placeholder='Your New Club Name'
            onChange={onClubNameChange}
          />
          <Flex
            sx={{
              justifyContent: 'center',
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <Button
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 4,
              }}
              onClick={toggleIsEditing}
            >
              <BiCheck />
              <Text as='span'>Save</Text>
            </Button>
            <Button
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 4,
              }}
              onClick={toggleIsEditing}
            >
              <BiX />
              <Text as='span'>Cancel</Text>
            </Button>
          </Flex>
        </Box>
      ) : (
        <>
          {nonEditMode()}
          <Flex
            sx={{
              justifyContent: 'center',
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <Button
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 4,
              }}
              onClick={toggleIsEditing}
              variant={'secondary'}
            >
              <BiEdit />
              <Text as='span' sx={{ ml: 3 }}>
                Edit Club Name
              </Text>
            </Button>
          </Flex>
        </>
      )}
    </>
  );
}

export default EditClubNameInput;
