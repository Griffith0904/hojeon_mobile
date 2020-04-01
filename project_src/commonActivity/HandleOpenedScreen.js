import React, { Component } from 'react';
import hjyjgv from './GrobalVar'

function HandleOpenedScreenPush (screenName) {
    hjyjgv.opened_screen.push(screenName)

}

function CheckOpenedScreenMaxCount() {
    return hjyjgv.opened_screen.length
}

function CheckTopScreenName() {
    return hjyjgv.opened_screen[hjyjgv.opened_screen.length]
}

function DeleteLastOpenedScreen() {
    hjyjgv.opened_screen.pop()
}

function ResetOpenedScrren() {
    hjyjgv.opened_screen = []
}

export default {
    HandleOpenedScreenPush:HandleOpenedScreenPush,
    CheckOpenedScreenMaxCount:CheckOpenedScreenMaxCount,
    CheckTopScreenName:CheckTopScreenName,
    DeleteLastOpenedScreen:DeleteLastOpenedScreen,
}