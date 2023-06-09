# from six.moves import queue
# import time
# import pyaudio
#
# STREAMING_LIMIT = 60000  # 4 minutes
# # SAMPLE_RATE = 16000
# SAMPLE_RATE = 16000
# CHUNK_SIZE = 320  # 100ms
#
# def get_current_time():
#     """Return Current Time in MS."""
#
#     return int(round(time.time() * 1000))
#
# class ResumableMicrophoneStream:
#     """Opens a recording stream as a generator yielding the audio chunks."""
#
#     def __init__(self, rate, chunk_size):
#         self._rate = rate
#         self.chunk_size = chunk_size
#         self._num_channels = 1
#         self._buff = queue.Queue()
#         self.closed = True
#         self.start_time = get_current_time()
#         self.restart_counter = 0
#         self.audio_input = []
#         self.last_audio_input = []
#         self.result_end_time = 0
#         self.is_final_end_time = 0
#         self.final_request_end_time = 0
#         self.bridging_offset = 0
#         self.last_transcript_was_final = False
#         self.new_stream = True
#         # self._vad = webrtcvad.Vad(3)
#         self._audio_interface = pyaudio.PyAudio()
#         self._audio_stream = self._audio_interface.open(
#             format=pyaudio.paInt16,
#             channels=self._num_channels,
#             rate=self._rate,
#             input=True,
#             frames_per_buffer=self.chunk_size,
#             # Run the audio stream asynchronously to fill the buffer object.
#             # This is necessary so that the input device's buffer doesn't
#             # overflow while the calling thread makes network requests, etc.
#             stream_callback=self._fill_buffer,
#         )
#
#     def __enter__(self):
#
#         self.closed = False
#         return self
#
#     def __exit__(self, type, value, traceback):
#
#         self._audio_stream.stop_stream()
#         self._audio_stream.close()
#         self.closed = True
#         # Signal the generator to terminate so that the client's
#         # streaming_recognize method will not block the process termination.
#         self._buff.put(None)
#         self._audio_interface.terminate()
#
#     def _fill_buffer(self, in_data, *args, **kwargs):
#         """Continuously collect data from the audio stream, into the buffer."""
#
#         self._buff.put(in_data)
#         return None, pyaudio.paContinue
#     def generator(self):
#         """Stream Audio from microphone to API and to local buffer"""
#         silence_counter = 0
#         audio_detected = False
#         while not self.closed:
#             data = []
#
#             # if self.new_stream and self.last_audio_input:
#             #
#             #     chunk_time = STREAMING_LIMIT / len(self.last_audio_input)
#             #
#             #     if chunk_time != 0:
#             #
#             #         if self.bridging_offset < 0:
#             #             self.bridging_offset = 0
#             #
#             #         if self.bridging_offset > self.final_request_end_time:
#             #             self.bridging_offset = self.final_request_end_time
#             #
#             #         chunks_from_ms = round(
#             #             (self.final_request_end_time - self.bridging_offset)
#             #             / chunk_time
#             #         )
#             #
#             #         self.bridging_offset = round(
#             #             (len(self.last_audio_input) - chunks_from_ms) * chunk_time
#             #         )
#             #
#             #         for i in range(chunks_from_ms, len(self.last_audio_input)):
#             #             data.append(self.last_audio_input[i])
#             #
#             #     self.new_stream = False
#
#             # Use a blocking get() to ensure there's at least one chunk of
#             # data, and stop iteration if the chunk is None, indicating the
#             # end of the audio stream.
#             chunk = self._buff.get()
#             # self.audio_input.append(chunk)
#
#             if chunk is None:
#                 return
#             # is_speech = self._vad.is_speech(chunk, self._rate)
#             if not audio_detected :
#                 audio_detected = True
#
#             if audio_detected:
#                 self.audio_input.append(chunk)
#                 data.append(chunk)
#                 #
#                 # if not is_speech:
#                 #     silence_counter += 1
#                 # else:
#                 #     silence_counter = 0
#                 #
#                 # if silence_counter > 100000000000:  # SILENCE_THRESHOLD는 실험을 통해 적절한 값을 찾아 설정해야 합니다.
#                 #     audio_detected = False
#                 #     yield b"".join(data)
#                 #     data = []
#                 #     self.audio_input = []
#             # Now consume whatever other data's still buffered.
#             else:
#                 self.audio_input = []
#             if data:
#                 yield b"".join(data)
#             while True:
#                 try:
#                     chunk = self._buff.get(block=False)
#
#                     if chunk is None:
#                         return
#                     data.append(chunk)
#                     self.audio_input.append(chunk)
#
#                 except queue.Empty:
#                     break
#
#             yield b"".join(data)
from six.moves import queue
import time
import pyaudio

STREAMING_LIMIT = 60000  # 4 minutes
# SAMPLE_RATE = 16000
SAMPLE_RATE = 16000
CHUNK_SIZE = 320  # 100ms


def get_current_time():
    """Return Current Time in MS."""

    return int(round(time.time() * 1000))


class ResumableMicrophoneStream:
    """Opens a recording stream as a generator yielding the audio chunks."""

    def __init__(self, rate, chunk_size):
        self._rate = rate
        self.chunk_size = chunk_size
        self._num_channels = 1
        self._buff = queue.Queue()
        self.closed = True
        self.start_time = get_current_time()
        self.restart_counter = 0
        self.audio_input = []
        self.last_audio_input = []
        self.result_end_time = 0
        self.is_final_end_time = 0
        self.final_request_end_time = 0
        self.bridging_offset = 0
        self.last_transcript_was_final = False
        self.new_stream = True
        # self._vad = webrtcvad.Vad(3)
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            channels=self._num_channels,
            rate=self._rate,
            input=True,
            frames_per_buffer=self.chunk_size,
            # Run the audio stream asynchronously to fill the buffer object.
            # This is necessary so that the input device's buffer doesn't
            # overflow while the calling thread makes network requests, etc.
            stream_callback=self._fill_buffer,
        )

    def __enter__(self):
        self.closed = False
        return self

    def __exit__(self, type, value, traceback):

        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        # Signal the generator to terminate so that the client's
        # streaming_recognize method will not block the process termination.
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, *args, **kwargs):
        """Continuously collect data from the audio stream, into the buffer."""

        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def change_audio_stream(self, audio_device_name):
        print(audio_device_name)
        input_device_index = None
        info = self._audio_interface.get_host_api_info_by_index(0)
        num_devices = info.get('deviceCount')
        for i in range(0, num_devices):
            device_info = self._audio_interface.get_device_info_by_host_api_device_index(0, i)
            if (device_info.get('name') == audio_device_name):
                input_device_index = i
                print(i)
                break

        # device_info = self._audio_interface.get_device_info_by_index(input_device_index)
        # num_channels = device_info.get('maxInputChannels')

        if input_device_index is not None:
            self._audio_stream.stop_stream()
            self._audio_stream.close()

            self._audio_stream = self._audio_interface.open(
                format=pyaudio.paInt16,
                channels=self._num_channels,
                rate=self._rate,
                input=True,
                frames_per_buffer=self.chunk_size,
                input_device_index=input_device_index,
                # Run the audio stream asynchronously to fill the buffer object.
                # This is necessary so that the input device's buffer doesn't
                # overflow while the calling thread makes network requests, etc.
                stream_callback=self._fill_buffer,
            )

    def generator(self):
        """Stream Audio from microphone to API and to local buffer"""
        silence_counter = 0
        audio_detected = False
        while not self.closed:
            data = []

            # if self.new_stream and self.last_audio_input:
            #
            #     chunk_time = STREAMING_LIMIT / len(self.last_audio_input)
            #
            #     if chunk_time != 0:
            #
            #         if self.bridging_offset < 0:
            #             self.bridging_offset = 0
            #
            #         if self.bridging_offset > self.final_request_end_time:
            #             self.bridging_offset = self.final_request_end_time
            #
            #         chunks_from_ms = round(
            #             (self.final_request_end_time - self.bridging_offset)
            #             / chunk_time
            #         )
            #
            #         self.bridging_offset = round(
            #             (len(self.last_audio_input) - chunks_from_ms) * chunk_time
            #         )
            #
            #         for i in range(chunks_from_ms, len(self.last_audio_input)):
            #             data.append(self.last_audio_input[i])
            #
            #     self.new_stream = False

            # Use a blocking get() to ensure there's at least one chunk of
            # data, and stop iteration if the chunk is None, indicating the
            # end of the audio stream.
            chunk = self._buff.get()
            # self.audio_input.append(chunk)

            if chunk is None:
                return
            # is_speech = self._vad.is_speech(chunk, self._rate)
            if not audio_detected:
                audio_detected = True

            if audio_detected:
                self.audio_input.append(chunk)
                data.append(chunk)
                #
                # if not is_speech:
                #     silence_counter += 1
                # else:
                #     silence_counter = 0
                #
                # if silence_counter > 100000000000:  # SILENCE_THRESHOLD는 실험을 통해 적절한 값을 찾아 설정해야 합니다.
                #     audio_detected = False
                #     yield b"".join(data)
                #     data = []
                #     self.audio_input = []
            # Now consume whatever other data's still buffered.
            else:
                self.audio_input = []
            if data:
                yield b"".join(data)
            while True:
                try:
                    chunk = self._buff.get(block=False)

                    if chunk is None:
                        return
                    data.append(chunk)
                    self.audio_input.append(chunk)

                except queue.Empty:
                    break

            yield b"".join(data)