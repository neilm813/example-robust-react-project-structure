/*
This file is to store frequently referenced hard-coded data that is constant
instead of hard-coding it in multiple places. It can only change if the
hard-coded values are changed.

SCREAMING_SNAKE_CASE is the common naming convention for constants.

Even commonly used strings that are passed as arguments may stored as
shared constants so they are not duplicated and can easily be updated and then
every arg that uses the const will be passing in the updated value.
*/

export const COMPANY_NAME = 'SpaceX';
