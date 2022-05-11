// How we get socket.io to work on the client

import {io, Socket} from "socket.io-client";
export {};

// Tell typescript io is an attribute of the window (even though it's not) so that it doesn't complain
declare global {
    interface Window {
        io: typeof io;
    }
}